import { fail, type RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { RecordModel } from "pocketbase";
import type { RouteParams } from "./$types";
import { joinGroupSchema } from "@/schema";
import { verifyPassword } from "@/hasher";

export async function joinGroupAction(event: RequestEvent<RouteParams, "/dashboard/groups">) {
    console.log("[joinGroup] A user is attempting to join a group.");

    const joinGroupForm = await superValidate(event, zod(joinGroupSchema));

    if (!joinGroupForm.valid) {
        return fail(401, {
            msg: "Unauthorized user.",
            joinGroupForm
        })
    }

    if (!event.locals.user) {
        return fail(400, {
            msg: "Invalid Form.",
            joinGroupForm
        })
    }

    const groupData = joinGroupForm.data;
    let group: RecordModel;

    try {
        group = await event.locals.pb.collection("groups").getFirstListItem(`groupId="${groupData.groupId}"`, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (_err) {
        console.log("[createGroup] Group Id is not taken:", groupData.groupId);
        return fail(400, {
            msg: "Failed to join group!",
            joinGroupForm
        });
    }
    
    if (!await verifyPassword(group.groupPassword, groupData.groupPassword)) {
        return fail(400, {
            msg: "Failed to join group!",
            joinGroupForm
        });
    }

    if (group.owner === event.locals.user.id) {
        return fail(400, {
            msg: "You're already the owner of the group!",
            joinGroupForm
        });
    }

    if (group.members.includes(event.locals.user.id)) {
        return fail(400, {
            msg: "You're already in that group!",
            joinGroupForm
        });
    }

    if (group.pendingMembers.includes(event.locals.user.id)) {
        return fail(400, {
            msg: "You're already pending in the group!",
            joinGroupForm
        });
    }

    try {
        const data = {
            "pendingMembers": [
                ...group.pendingMembers,
                event.locals.user.id
            ],
        };

        await event.locals.pb.collection('groups').update(group.id, data, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (err) {
        console.log("[joinGroup] Failed to add user id to pending group list.", err);
        return fail(400, {
            msg: "Failed to join group! Try again another time.",
            joinGroupForm
        });
    }

    return {
        msg: `Successfully joined the pending list of "${group.groupName}"`,
        joinGroupForm
    }
}