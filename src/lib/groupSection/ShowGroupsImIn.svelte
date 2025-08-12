<script lang="ts">
    import EventButton from "@/EventButton.svelte";
    import type { RecordModel } from "pocketbase";

    const { associatedGroups, userId }: { associatedGroups: RecordModel[], userId: string } = $props();
</script>

{#if associatedGroups.length > 0}
    {#each associatedGroups as group (`mycurrentgroupslist${group.id}`)}
        {#if (group.members as string[]).includes(userId) || group.owner === userId}
            <EventButton
                name={group.groupName}
                toWhom="{group.expand ? group.expand.owner.name : "N/A"} {group.owner === userId ? "(you)" : ""}"
                href="/dashboard/groups/{group.id}"
            />
        {:else}
            <EventButton
                name="{group.groupName} (pending)"
                toWhom={group.expand ? group.expand.owner.name : "N/A"}
                href="/dashboard/groups/{group.id}"
            />
        {/if}
    {/each}
{:else}
    <p>You're not part of a group yet.</p>
{/if}

<style>
    p {
        text-align: center;
        padding: 20px;
        color: gray;
    }
</style>