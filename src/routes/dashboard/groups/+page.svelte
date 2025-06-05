<script lang="ts">
    import EventButton from "@/EventButton.svelte";
    import * as Drawer from "$lib/components/ui/drawer";
    import { Button } from "$lib/components/ui/button/index.js";
</script>
<section class="groups">
    <h1 class="poppins-semibold">Groups</h1>
    <section class="groupslist">
        <EventButton name="Babysitting Helpers Group" toWhom="Jana Gruzin" />
        <EventButton name="Food Helpers Group" toWhom="Stephen Gruzin (you)" />
        <button class="poppins-semibold createGroup">Create A Group</button>
        <button class="poppins-semibold joinGroup">Join A Group</button>
    </section>
</section>
<Drawer.Root>
    <Drawer.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline">Open Drawer</Button>
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
    .groups {
        width: 100%;
        /* height: 100%; */
        overflow-y: auto;
        padding: 0 20px;
    }

    h1 {
        text-align: center;
        font-size: 45px;
        margin-top: 50px;
    }

    .groupslist {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    button {
        width: 100%;
        height: 55px;
        border-radius: 10px;
        font-size: 20px;
        color: #ffffff;
    }

    .createGroup {background-color: #3A9FE9;}
    .joinGroup {background-color: #EE3F3F;}
</style>