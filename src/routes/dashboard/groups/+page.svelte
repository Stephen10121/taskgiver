<script lang="ts">
    import EventButton from "@/EventButton.svelte";
    import CreateGroupDrawer from "@/groupSection/CreateGroupDrawer.svelte";
    import JoinGroupDrawer from "@/groupSection/JoinGroupDrawer.svelte";

    let { data } = $props();
</script>

<section class="groups">
    <h1 class="poppins-semibold">Groups</h1>
    <section class="groupslist">
        <EventButton name="Babysitting Helpers Group" toWhom="Jana Gruzin" />
        <EventButton name="Food Helpers Group" toWhom="Stephen Gruzin (you)" />
        <CreateGroupDrawer {data} />
        <JoinGroupDrawer />
    </section>
</section>

<style>
    .groups {
        width: 100%;
        height: 100%;
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
</style>