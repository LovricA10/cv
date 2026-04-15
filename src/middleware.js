import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(({ request, cookies, redirect }, next) => {
    const url = new URL(request.url);

    if (url.pathname === '/cv') {
        const cookie = cookies.get('cv_access');

        if (cookie?.value !== 'true') {
            return redirect('/login');
        }
    }

    return next();
});