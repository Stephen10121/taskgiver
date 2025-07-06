import z from "zod";

export const createGroupSchema = z.object({
    groupName: z.string().min(1),
    groupId: z.string().min(1),
    groupPassword: z.string().min(1),
    repeatGroupPassword: z.string().min(1),
    othersCanContribute: z.boolean()
});

export type CreateGroupSchema = typeof createGroupSchema;