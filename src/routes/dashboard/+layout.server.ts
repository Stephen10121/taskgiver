import { redirect } from '@sveltejs/kit';
import { config } from "dotenv";

config();

export async function load({ locals, url }) {
    if (locals.user) {
        try {
            let [ user, associatedGroups ] = await Promise.all([
                locals.pb.collection("users").getOne(locals.user.id, {
                    headers: {
                        "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                    }
                }),
                locals.pb.collection("groups").getFullList({
                    filter: `owner = '${locals.user.id}' || members:each ?= '${locals.user.id}' || pendingMembers:each ?= '${locals.user.id}'`,
                    expand: "owner",
                    headers: {
                        "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                    }
                })
            ]);

            return {
                associatedGroups,
                user,
                avatar: locals.pb.files.getURL(user, user.avatar),
                pathname: url.pathname
            }
        } catch (err) {
            console.log(err);

            return redirect(303, "/logout");
        }
    }
    return redirect(303, "/logout");
}