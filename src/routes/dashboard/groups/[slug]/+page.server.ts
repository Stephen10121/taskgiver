import { redirect } from "@sveltejs/kit";
import { config } from "dotenv";
import type { RecordModel } from "pocketbase";

config();

type GroupResponse = ({
    memberType: "owner",
    groupData: {
        groupName: string,
        groupId: string,
        groupActualId: string,
        othersCanContribute: boolean,
        members: {
            id: string,
            name: string,
            avatar: string,
            email: string
        }[],
        pendingMembers: {
            id: string,
            name: string,
            avatar: string,
            email: string
        }[],
        created: string,
        owner: {
            name: string,
            avatar: string,
            email: string,
            id: string
        },
        groupAbout: string
    }
} | {
    memberType: "member",
    groupData: {
        groupName: string,
        groupId: string,
        othersCanContribute: boolean,
        members: {
            id: string,
            name: string,
            avatar: string,
            email: string
        }[],
        created: string,
        owner: {
            id: string,
            name: string,
            avatar: string,
            email: string
        },
        groupAbout: string
    }
} | {
    memberType: "pending",
    groupData: {
        groupName: string,
        groupId: string,
        owner: {
            name: string,
            avatar: string
        },
        groupAbout: string
    }
})

export async function load({ params, locals, parent }): Promise<GroupResponse> {
    if (!locals.user) {
        return redirect(303, "/");
    }

    const groupId = params.slug;
    const data = await parent();

    const filteredGroup = data.associatedGroups.filter((group) => group.id === groupId);
    
    if (filteredGroup.length === 0) return redirect(303, "/dashboard/groups");

    const group = filteredGroup[0];

    const isMember = group.members.includes(locals.user.id) as boolean;
    const isPendingMember = group.pendingMembers.includes(locals.user.id) as boolean;
    const isOwner = group.owner === locals.user.id;

    if (!isMember && !isPendingMember && !isOwner) return redirect(303, "/dashboard/groups");

    if (isPendingMember) {
        return {
            memberType: "pending",
            groupData: {
                groupId: group.groupId,
                groupAbout: group.groupAbout,
                groupName: group.groupName,
                owner: {
                    name: group.expand ? group.expand.owner.name : "N/A",
                    avatar: group.expand ? group.expand.owner.avatar : "N/A",
                },
            }
        }
    }

    let record: RecordModel;

    try {
        record = await locals.pb.collection('groups').getOne(group.id, {
            expand: 'members,pendingMembers,owner',
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (err) {
        console.log("[groupInfo] Failed to fetch expanded group Info.", err);
        return redirect(303, "/dashboard/groups");
    }

    if (isMember) {
        return {
            memberType: "member",
            groupData: {
                groupId: group.groupId,
                groupAbout: group.groupAbout,
                groupName: group.groupName,
                othersCanContribute: group.othersCanContribute,
                created: group.created,
                owner: {
                    id: group.expand ? group.expand.owner.id : "N/A",
                    name: group.expand ? group.expand.owner.name : "N/A",
                    email: group.expand ? group.expand.owner.email : "N/A",
                    avatar: group.expand ? locals.pb.files.getURL(group.expand.owner, group.expand.owner.avatar) : "N/A",
                },
                members: record.expand ? record.expand.members ? record.expand.members.map((member: RecordModel) => {return {id: member.id, name: member.name, avatar: locals.pb.files.getURL(member, member.avatar), email: member.email}}): [] : [],
            }
        }
    }

    return {
        memberType: "owner",
        groupData: {
            groupId: group.groupId,
            groupActualId: group.id,
            groupAbout: group.groupAbout,
            groupName: group.groupName,
            othersCanContribute: group.othersCanContribute,
            created: group.created,
            owner: {
                id: group.expand ? group.expand.owner.id : "N/A",
                name: group.expand ? group.expand.owner.name : "N/A",
                email: group.expand ? group.expand.owner.email : "N/A",
                avatar: group.expand ? locals.pb.files.getURL(group.expand.owner, group.expand.owner.avatar) : "N/A",
            },
            members: record.expand ? record.expand.members ? record.expand.members.map((member: RecordModel) => {return {id: member.id, name: member.name, avatar: locals.pb.files.getURL(member, member.avatar), email: member.email}}): [] : [],
            pendingMembers: record.expand ? record.expand.pendingMembers ? record.expand.pendingMembers.map((member: RecordModel) => {return {id: member.id, name: member.name, avatar: locals.pb.files.getURL(member, member.avatar), email: member.email}}): [] : [],
        }
    }
}