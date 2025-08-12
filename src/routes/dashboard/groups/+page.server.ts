import { createGroupSchema, joinGroupSchema } from '@/schema';
import { superValidate } from "sveltekit-superforms/server";
import { createGroupAction } from './createGroupAction.js';
import { joinGroupAction } from './joinGroupAction.js';
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from '@sveltejs/kit';

export async function load(event) {
    if (!event.locals.user) {
        return redirect(303, "/logout");
    }
    await event.parent();

    return {
        createGroupForm: await superValidate(zod(createGroupSchema)),
        joinGroupForm: await superValidate(zod(joinGroupSchema))
    }
}

export const actions = {
    createGroup: createGroupAction,
    joinGroup: joinGroupAction
}