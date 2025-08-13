<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Ellipsis } from "@lucide/svelte";
    import { toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";

    const {
        name,
        avatar,
        email,
        isOwner,
        memberType,
        groupId,
        memberId
    }: {
            name: string,
            avatar: string,
            email: string,
            isOwner: boolean,
            memberType: "owner" | "member" | "pending",
            groupId: string,
            memberId: string
        } = $props();

    let bindableMemberType = $state(memberType);
    let openRemoveDialog = $state(false);

    function changeMemberType(newMemberStatus: string) {
        fetch("/api/changeMemberStatus", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId,
                memberId,
                newMemberStatus
            })
        }).then((res) => {
            if (!res.ok) {
                toast.error("Failed to update member status.");
                bindableMemberType = newMemberStatus === "member" ? "pending" : "member";
                console.log(res);
                return;
            }

            res.json().then((resp) => {
                toast.success("Changed member status!");
                console.log("All good,", resp);
            });
        });
    }

    function kickMember() {
        openRemoveDialog = false;
        fetch("/api/removeMember", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId,
                memberId
            })
        }).then((res) => {
            if (!res.ok) {
                toast.error("Failed to remove member.");
                console.log(res);
                return;
            }

            res.json().then((resp) => {
                toast.success("Removed member!");
                invalidateAll();
                console.log("All good,", resp);
            });
        });
    }
</script>

<div class="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
    <div class="flex items-center gap-3">
        <Avatar.Root class="h-10 w-10">
            <Avatar.Image src={avatar} alt={name} />
            <Avatar.Fallback class="bg-primary/10 text-primary font-medium">
                {name.split(" ").map(((n) => n[0])).join("")}
            </Avatar.Fallback>
        </Avatar.Root>
        <div>
            <h3 class="font-medium">{name}</h3>
            <p class="text-sm text-muted-foreground">{email}</p>
        </div>
    </div>
    {#if isOwner && memberType !== "owner"}
        <div class="flex gap-1">
            <Select.Root type="single" bind:value={bindableMemberType} onValueChange={changeMemberType}>
                <Select.Trigger class="w-[180px]">
                    {#if bindableMemberType === "member"}
                        Member
                    {:else}
                        Pending Member
                    {/if}
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="member">Member</Select.Item>
                    <Select.Item value="pending">Pending Member</Select.Item>
                </Select.Content>
            </Select.Root>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    {#snippet child({ props })}
                        <Button {...props} variant="outline"><Ellipsis /></Button>
                    {/snippet}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                    <DropdownMenu.Label>Actions</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onclick={() => openRemoveDialog = true}>
                        <p class="text-rose-600">Remove</p>
                    </DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <AlertDialog.Root bind:open={openRemoveDialog}>
                <AlertDialog.Content>
                    <AlertDialog.Header>
                    <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                    <AlertDialog.Description>
                        This action cannot be undone. This will remove the person from the group. They can still rejoin though.
                    </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        <AlertDialog.Action onclick={kickMember}>Continue</AlertDialog.Action>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </div>
    {:else}
        <Badge variant="secondary" class={memberType === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : memberType === "owner" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}>
            {memberType}
        </Badge>
    {/if}
</div>