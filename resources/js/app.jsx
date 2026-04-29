import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Ziggy } from './ziggy.js';
import { route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'SalesForge';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Make route function available globally in components
        window.route = (name, params, absolute, config = Ziggy) => route(name, params, absolute, config);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
