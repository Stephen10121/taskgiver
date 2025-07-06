import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { createGroupSchema } from '@/schema';


export async function load(event) {
    if (!event.locals.user) {
        return redirect(303, "/logout");
    }
    await event.parent();

    return {
        createGroupForm: await superValidate(zod(createGroupSchema))
    }
}

export const actions = {
    createGroup: async (event) => {
        console.log("form event")
        const createGroupForm = await superValidate(event, zod(createGroupSchema));

        if (!createGroupForm.valid) {
            return fail(400, {
                createGroupForm
            })
        }
        console.log("good");
        return {
            createGroupForm
        }
    }
}