import { fail, type RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { generateHashPassword } from "@/hasher";
import { createJobSchema } from "@/schema";
import type { RouteParams } from "./$types";
import type { RecordModel } from "pocketbase";

export async function createJobAction(event: RequestEvent<RouteParams, "/dashboard/addJob">) {
    console.log("[createJob] A job is bieng created.");

    const createJobForm = await superValidate(event, zod(createJobSchema));

    if (!createJobForm.valid) {
        return fail(401, {
            msg: "Unauthorized user.",
            createJobForm
        })
    }

    if (!event.locals.user) {
        return fail(400, {
            msg: "Invalid Form.",
            createJobForm
        })
    }

    const jobData = createJobForm.data;
    let groupForJob: RecordModel;

    try {
        groupForJob = await event.locals.pb.collection("groups").getFirstListItem(`id="${jobData.jobGroup}"`, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        })
    } catch (_err) {
        return fail(500, {
            msg: "Failed to create job.",
            createJobForm
        });
    }

    const userIsOwner = event.locals.user.id === groupForJob.owner;
    const userIsMember = groupForJob.members.includes(event.locals.user.id) as boolean;
    const othersCanContribute = groupForJob.othersCanContribute as boolean;
    const userCanAddJob = userIsOwner || (userIsMember && othersCanContribute);

    if (!userCanAddJob) {
        return fail(400, {
            msg: "You aren't allowed to create jobs for this group!",
            createJobForm
        });
    }

    try {
        const record = await event.locals.pb.collection('jobs').create({
            "jobGroup": jobData.jobGroup,
            "jobClient": jobData.jobClient,
            "jobAddress": jobData.jobAddress,
            "jobDateTime": jobData.jobDateTime,
            "jobDetails": jobData.jobDetails,
            "jobVolunteerAmount": jobData.jobVolunteerAmount,
            "jobNotifyGroup": jobData.jobNotifyGroup,
            "jobIssuedBy": event.locals.user.id,
            "jobTitle": jobData.jobTitle
        }, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });

        console.log("[createJob] Successfully created job in database:", jobData.jobTitle);

        return {
            msg: `Successfully created job: "${jobData.jobTitle}"`,
            record,
            createJobForm
        }
    } catch (err) {
        console.log("[createJob] An error occured when creating job in database:", err);
        return fail(400, {
            msg: "Failed to create job.",
            createJobForm
        });
    }
}