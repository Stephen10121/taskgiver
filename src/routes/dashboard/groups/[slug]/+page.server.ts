import { redirect } from "@sveltejs/kit";
import { config } from "dotenv";

config();

export async function load({ params, locals, parent }) {
    if (!locals.user) {
        return redirect(303, "/");
    }

    const groupId = params.slug;
    const data = await parent();

    if (!data.associatedGroups.filter((group) => group.id === groupId)) {
        return redirect(303, "/dashboard/groups");
    }

    try {
        const record = await locals.pb.collection("groups").getOne(groupId, {
            expand: "owner,members,pendingMembers",
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });

        return {
            groupInfo: record
        }
    } catch (err) {
        console.log(`[aboutGroupPage] Failed to fetch data for "${groupId}". Error:`, err);
        return redirect(303, "/dashboard/groups");
    }
}