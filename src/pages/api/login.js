export const prerender = false;

export async function POST({ request, cookies }) {
    const body = await request.json();
    const code = body.code;
    const ACCESS_CODE = import.meta.env.ACCESS_CODE;

    if (code === ACCESS_CODE) {
        cookies.set('cv_access', 'true', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: false }), { status: 401 });
}