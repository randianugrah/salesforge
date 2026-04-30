<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        // Jika dideploy di Render, gunakan RENDER_EXTERNAL_URL secara otomatis
        if (isset($_SERVER['RENDER_EXTERNAL_URL'])) {
            config(['app.url' => $_SERVER['RENDER_EXTERNAL_URL']]);
        }

        Vite::prefetch(concurrency: 3);
    }
}
