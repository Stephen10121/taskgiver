import { createJobSchema } from '@/schema';
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from '@sveltejs/kit';
import { createJobAction } from './createJobAction.js';

export async function load(event) {
    if (!event.locals.user) {
        return redirect(303, "/logout");
    }
    await event.parent();

    return {
        createJobForm: await superValidate(zod(createJobSchema)),
    }
}

export const actions = {
    createJob: createJobAction
}