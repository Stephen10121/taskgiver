import { fail, type RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { generateHashPassword } from "@/hasher";
import { createGroupSchema } from "@/schema";
import type { RouteParams } from "./$types";

export async function createGroupAction(event: RequestEvent<RouteParams, "/dashboard/groups">) {
    console.log("[createGroup] A group is bieng created.");

    const createGroupForm = await superValidate(event, zod(createGroupSchema));

    if (!createGroupForm.valid) {
        return fail(401, {
            msg: "Unauthorized user.",
            createGroupForm
        })
    }

    if (!event.locals.user) {
        return fail(400, {
            msg: "Invalid Form.",
            createGroupForm
        })
    }

    const groupData = createGroupForm.data;

    if (groupData.groupPassword !== groupData.repeatGroupPassword) {
        return fail(400, {
            msg: "Passwords Dont match!",
            createGroupForm
        });
    }

    try {
        const groupExists = await event.locals.pb.collection("groups").getFirstListItem(`groupId="${groupData.groupId}"`, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        })

        if (groupExists.id) {
            return fail(400, {
                msg: "Group Id is taken!",
                createGroupForm
            });
        }
    } catch (_err) {
        console.log("[createGroup] Group Id is not taken:", groupData.groupId);
    }

    try {
        const record = await event.locals.pb.collection('groups').create({
            "name": groupData.name,
            "groupId": groupData.groupId,
            "groupPassword": await generateHashPassword(groupData.groupPassword),
            "othersCanContribute": groupData.othersCanContribute,
            "members": [],
            "pendingMembers": [],
            "owner": event.locals.user.id,
            "groupAbout": groupData.groupAbout
        }, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });

        console.log("[createGroup] Successfully created group in database:", groupData.groupId);

        return {
            msg: `Successfully created "${createGroupForm.data.name}"`,
            record,
            createGroupForm
        }
    } catch (err) {
        console.log("[createGroup] An error occured when creating group in database:", err);
        return fail(400, {
            msg: "Failed to create group!",
            createGroupForm
        });
    }
}