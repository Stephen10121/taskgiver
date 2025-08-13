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
    if (!body.groupId || !body.memberId || !body.newMemberStatus) {
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

    if (body.newMemberStatus === "pending" && !record.members.includes(body.memberId)) {
        return json({
            msg: "This person is not a current member."
        }, {
            status: 400,
            statusText: "This person is not a current member."
        });
    }

    if (body.newMemberStatus === "member" && !record.pendingMembers.includes(body.memberId)) {
        return json({
            msg: "This person is not a pending member."
        }, {
            status: 400,
            statusText: "This person is not a pending member."
        });
    }

    try {
        let data;
        if (body.newMemberStatus === "member") {
            data = {
                "members": [...record.members, body.memberId],
                "pendingMembers": record.pendingMembers.filter((member: string) => member !== body.memberId),
            };
        } else {
            data = {
                "members": record.members.filter((member: string) => member !== body.memberId),
                "pendingMembers": [...record.pendingMembers, body.memberId],
            };
        }
    
        await event.locals.pb.collection('groups').update(record.id, data, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (err) {
        console.log("Failed to update group record to change member status, ", err);
        return json({
            msg: "Server Error"
        }, {status: 500, statusText: "Internal Server Error"});
    }

    return json({
        msg: "Good"
    });
}