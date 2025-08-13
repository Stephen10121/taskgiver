import { json } from "@sveltejs/kit";
import type { RecordModel } from "pocketbase";
import { config } from "dotenv";

config();

export async function POST(event) {
    if (!event.locals.user) {
        return json({
            msg: "Unauthorized."
        }, {
            status: 401,
            statusText: "Unauthorized."
        });
    }

    const body = await event.request.json();
    if (!body.groupId || !body.memberId) {
        return json({
            msg: "Missing parameters."
        }, {
            status: 422,
            statusText: "Missing parameters."
        });
    }

    let record: RecordModel;
    try {
        record = await event.locals.pb.collection('groups').getOne(body.groupId, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (_err) {
        return json({
            msg: "Unauthorized."
        }, {
            status: 401,
            statusText: "Unauthorized."
        });
    }

    if (record.owner !== event.locals.user.id) {
        return json({
            msg: "Unauthorized."
        }, {
            status: 401,
            statusText: "Unauthorized."
        });
    }

    const isInPendingMembers = record.pendingMembers.includes(body.memberId);
    const isInMembers = record.members.includes(body.memberId);

    if (!isInPendingMembers && !isInMembers) {
        return json({
            msg: "This person is not in group."
        }, {
            status: 400,
            statusText: "This person is not in group."
        });
    }

    try {
        let data;
        if (isInPendingMembers) {
            data = {
                "pendingMembers": record.pendingMembers.filter((member: string) => member !== body.memberId),
            };
        } else if (isInMembers) {
            data = {
                "members": record.members.filter((member: string) => member !== body.memberId),
            };
        }
    
        await event.locals.pb.collection('groups').update(record.id, data, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (err) {
        console.log("Failed to update group record to remove member, ", err);
        return json({
            msg: "Server Error"
        }, {status: 500, statusText: "Internal Server Error"});
    }

    return json({
        msg: "Good"
    });
}