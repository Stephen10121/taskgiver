<script lang="ts">
    import ShowDateCreated from "@/groupSection/aboutGroup/ShowDateCreated.svelte";
    import MemberRow from "@/groupSection/aboutGroup/MemberRow.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { CalendarDays, Users } from "@lucide/svelte";

    const { data } = $props();

    console.log(data);
</script>

<svelte:head>
    <title>{data.groupData.name} | TaskGiver</title>
</svelte:head>

<main class="min-h-screen bg-background p-6">
    <div class="max-w-4xl mx-auto">
        <div class="space-y-6">
            <div class="flex items-center gap-3">
                <Users class="h-8 w-8 text-primary" />
                <div>
                    <h1 class="text-3xl font-bold">{data.groupData.name}</h1>
                    {#if data.memberType !== "pending"}
                        <div class="flex items-center gap-2 text-muted-foreground mt-1">
                            <CalendarDays class="h-4 w-4" />
                            <ShowDateCreated date={data.groupData.created} />
                        </div>
                    {/if}
                </div>
            </div>
            <div>
                <p>{data.groupData.groupAbout}</p>
            </div>
            {#if data.memberType !== "pending"}
                <Card.Root>
                    <Card.Header>
                        <Card.Title class="flex items-center gap-2">
                            <Users class="h-5 w-5" />
                            Members ({data.groupData.members.length + 1 + (data.memberType === "owner" ? data.groupData.pendingMembers?.length : 0)})
                        </Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <div class="space-y-4">
                            <!-- The owners member row -->
                            <MemberRow
                                name={data.groupData.owner.name}
                                avatar={data.groupData.owner.avatar}
                                email={data.groupData.owner.email}
                                isOwner={data.memberType === "owner"}
                                memberType="owner"
                                groupId={data.memberType === "owner" ? data.groupData.groupActualId : ""}
                                memberId={"N/A"}
                            />
                            {#if data.memberType === "owner"}
                                {#each data.groupData.pendingMembers as member (`pendingGroupMember${member.id}`)}
                                    <!-- The pending users row -->
                                    <MemberRow
                                        name={member.name}
                                        avatar={member.avatar}
                                        email={member.email}
                                        isOwner={data.memberType === "owner"}
                                        memberType="pending"
                                        groupId={data.memberType === "owner" ? data.groupData.groupActualId : ""}
                                        memberId={member.id}
                                    />
                                {/each}
                            {/if}
                            {#each data.groupData.members as member (`groupMember${member.id}`)}
                                <!-- The member users row -->
                                <MemberRow
                                    name={member.name}
                                    avatar={member.avatar}
                                    email={member.email}
                                    isOwner={data.memberType === "owner"}
                                    memberType="member"
                                    groupId={data.memberType === "owner" ? data.groupData.groupActualId : ""}
                                    memberId={member.id}
                                />
                            {/each}
                        </div>
                    </Card.Content>
                </Card.Root>
            {/if}
        </div>
    </div>
</main>