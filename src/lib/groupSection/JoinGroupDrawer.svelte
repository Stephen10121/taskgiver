<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<Drawer.Root>
    <Drawer.Trigger>
        <button class="poppins-semibold joinGroup">Join A Group</button>
    </Drawer.Trigger>
    <Drawer.Content>
        <Drawer.Header>
        <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
        <Drawer.Description>This action cannot be undone.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
            <Button>Submit</Button>
            <Drawer.Close>Cancel</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>

<style>
    .joinGroup {
        background-color: #EE3F3F;
        width: 100%;
        height: 55px;
        border-radius: 10px;
        font-size: 20px;
        color: #ffffff;
    }
</style>