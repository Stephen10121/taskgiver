import { redirect } from '@sveltejs/kit';

export async function load({ parent, locals }) {
    if (!locals.user) {
        return redirect(303, "/logout");
    }
    await parent();
}