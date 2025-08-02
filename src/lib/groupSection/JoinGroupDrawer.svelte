<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })} style="background-color:#EE3F3F;">Join A Group</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Join a group</Dialog.Title>
            <Dialog.Description>
                All groups are private by default. You can add users to your group by sharing the group ID.
            </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
            <Button type="submit" form="creategroupform" style="background-color: #3aa0e9;">Joim Group</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>