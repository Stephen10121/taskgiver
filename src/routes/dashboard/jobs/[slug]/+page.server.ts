import { redirect } from "@sveltejs/kit";
import { config } from "dotenv";
import type { RecordModel } from "pocketbase";

config();

type JobResponse = ({
    memberType: "groupowner",
    jobData: {
        id: string,
        title: string,
        details: string,
        jobDate: string,
        client: string,
        jobGroup: {
            id: string,
            name: string,
            avatar: string
        },
        address: string,
        issuedBy: {
            id: string,
            name: string,
            avatar: string,
            email: string
        },
        volunteersNeeded: number,
        volunteers: {
            id: string,
            name: string,
            avatar: string,
            email: string
        }[],
        created: string,
        updated: string
    }
} | {
    memberType: "jobowner",
    jobData: {
        id: string,
        title: string,
        details: string,
        jobDate: string,
        client: string,
        jobGroup: {
            id: string,
            name: string,
            avatar: string
        },
        address: string,
        issuedBy: {
            id: string,
            name: string,
            avatar: string,
            email: string
        },
        volunteersNeeded: number,
        volunteers: {
            id: string,
            name: string,
            avatar: string,
            email: string
        }[],
        created: string,
        updated: string
    }
} | {
    memberType: "member",
    jobData: {
        id: string,
        title: string,
        details: string,
        jobDate: string,
        client: string,
        jobGroup: {
            id: string,
            name: string,
            avatar: string
        },
        address: string,
        issuedBy: {
            name: string,
            avatar: string,
            email: string
        },
        volunteersNeeded: number,
        volunteers: {
            name: string,
            avatar: string,
            email: string
        }[],
        created: string,
        updated: string
    }
})

export async function load({ params, locals, parent }): Promise<{job: JobResponse}> {
    if (!locals.user) {
        return redirect(303, "/");
    }

    const jobId = params.slug;
    const data = await parent();

    let job: RecordModel;
    try {
        job = await locals.pb.collection('jobs').getOne(jobId, {
            expand: 'jobIssuedBy,volunteers',
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (_err) {
        console.log(`[fetchJob] Job doesn't exist: '${jobId}'`);
        return redirect(303, "/");
    }

    const groupForJobArray = (data.associatedGroups as RecordModel[]).filter((group) => group.id === job.jobGroup);

    // Technically this means that the user is not in the group but can still be a pending member.
    if (groupForJobArray.length === 0) {
        return redirect(303, "/");
    }

    const groupForJob = groupForJobArray[0];

    const isGroupOwner = groupForJob.owner === locals.user.id;
    const isJobOwner = job.jobIssuedBy === locals.user.id;
    const isGroupMember = groupForJob.members.includes(locals.user.id) as boolean;

    // This makes sure that the user has the authorized access.
    if (!isGroupMember && !isJobOwner && !isGroupOwner) {
        return redirect(303, "/");
    }

    if (!job.expand || !job.expand.jobIssuedBy) {
        console.log(`[fetchJob] Nothing in expand params of job: ${job}`);
        return redirect(303, "/");
    }

    if (isGroupOwner) {
        return {
            job: {
                memberType: "groupowner",
                jobData: {
                    id: job.id,
                    title: job.jobTitle,
                    details: job.jobDetails,
                    jobDate: job.jobDateTime,
                    client: job.jobClient,
                    jobGroup: {
                        id: groupForJob.id,
                        name: groupForJob.name,
                        avatar: locals.pb.files.getURL(groupForJob, groupForJob.avatar)
                    },
                    address: job.jobAddress,
                    issuedBy: {
                        id: job.expand.jobIssuedBy.id,
                        name: job.expand.jobIssuedBy.name,
                        avatar: locals.pb.files.getURL(job.expand.jobIssuedBy, job.expand.jobIssuedBy.avatar),
                        email: job.expand.jobIssuedBy.email
                    },
                    volunteersNeeded: job.jobVolunteerAmount,
                    volunteers: job.expand.volunteers ? job.expand.volunteers.map((volunteer: RecordModel) => {
                        return {
                            id: volunteer.id,
                            name: volunteer.name,
                            avatar: locals.pb.files.getURL(volunteer, volunteer.avatar),
                            email: volunteer.email
                        }
                    }) : [],
                    created: job.created,
                    updated: job.updated
                }
            }
        }
    }

    if (isJobOwner) {
        return {
            job: {
                memberType: "jobowner",
                jobData: {
                    id: job.id,
                    title: job.jobTitle,
                    details: job.jobDetails,
                    jobDate: job.jobDateTime,
                    client: job.jobClient,
                    jobGroup: {
                        id: groupForJob.id,
                        name: groupForJob.name,
                        avatar: locals.pb.files.getURL(groupForJob, groupForJob.avatar)
                    },
                    address: job.jobAddress,
                    issuedBy: {
                        id: job.expand.jobIssuedBy.id,
                        name: job.expand.jobIssuedBy.name,
                        avatar: locals.pb.files.getURL(job.expand.jobIssuedBy, job.expand.jobIssuedBy.avatar),
                        email: job.expand.jobIssuedBy.email
                    },
                    volunteersNeeded: job.jobVolunteerAmount,
                    volunteers: job.expand.volunteers ? job.expand.volunteers.map((volunteer: RecordModel) => {
                        return {
                            id: volunteer.id,
                            name: volunteer.name,
                            avatar: locals.pb.files.getURL(volunteer, volunteer.avatar),
                            email: volunteer.email
                        }
                    }) : [],
                    created: job.created,
                    updated: job.updated
                }
            }
        }
    }

    if (isGroupMember) {
        return {
            job: {
                memberType: "member",
                jobData: {
                    id: job.id,
                    title: job.jobTitle,
                    details: job.jobDetails,
                    jobDate: job.jobDateTime,
                    client: job.jobClient,
                    jobGroup: {
                        id: groupForJob.id,
                        name: groupForJob.name,
                        avatar: locals.pb.files.getURL(groupForJob, groupForJob.avatar)
                    },
                    address: job.jobAddress,
                    issuedBy: {
                        name: job.expand.jobIssuedBy.name,
                        avatar: locals.pb.files.getURL(job.expand.jobIssuedBy, job.expand.jobIssuedBy.avatar),
                        email: job.expand.jobIssuedBy.email
                    },
                    volunteersNeeded: job.jobVolunteerAmount,
                    volunteers: job.expand.volunteers ? job.expand.volunteers.map((volunteer: RecordModel) => {
                        return {
                            id: volunteer.id,
                            name: volunteer.name,
                            avatar: locals.pb.files.getURL(volunteer, volunteer.avatar),
                            email: volunteer.email
                        }
                    }) : [],
                    created: job.created,
                    updated: job.updated
                }
            }
        }
    }
    
    return redirect(303, "/");
}