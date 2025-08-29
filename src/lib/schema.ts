import z from "zod";

export const createGroupSchema = z.object({
    name: z.string().min(1),
    groupId: z.string().min(1),
    groupPassword: z.string().min(1),
    repeatGroupPassword: z.string().min(1),
    othersCanContribute: z.boolean(),
    groupAbout: z.string()
});
export type CreateGroupSchema = typeof createGroupSchema;

export const joinGroupSchema = z.object({
    groupId: z.string().min(1),
    groupPassword: z.string().min(1)
});
export type JoinGroupSchema = typeof joinGroupSchema;

export const createJobSchema = z.object({
    jobGroup: z.string().min(1),
    jobClient: z.string().min(1),
    jobAddress: z.string(),
    jobDateTime: z.date(),
    jobDetails: z.string().min(1),
    jobVolunteerAmount: z.number().min(1),
    jobNotifyGroup: z.boolean(),
    jobTitle: z.string().min(1)
});
export type CreateJobSchema = typeof createJobSchema;