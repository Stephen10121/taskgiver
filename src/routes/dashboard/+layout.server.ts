import { redirect } from '@sveltejs/kit';
import { config } from "dotenv";

config();

export async function load({ locals, url }) {
    if (locals.user) {
        try {
            const user = await locals.pb.collection("users").getOne(locals.user.id, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });

            return {
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