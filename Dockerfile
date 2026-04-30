FROM php:8.4-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_sqlite zip

# Allow Composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install Node.js (Version 20)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Install composer and npm dependencies
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs
RUN npm install

# Declare build arg so APP_URL can be passed in at build time
ARG APP_URL=https://salesforge-ps8q.onrender.com

# Regenerate ziggy.js with the correct production URL before building frontend
RUN APP_URL=${APP_URL} php artisan ziggy:generate resources/js/ziggy.js

RUN npm run build

# Ensure database directory exists and set permissions
RUN mkdir -p database && touch database/database.sqlite
RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache /var/www/database

# Expose port
EXPOSE 8000

# Start command
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
