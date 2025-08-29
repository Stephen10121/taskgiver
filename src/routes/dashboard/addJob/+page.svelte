<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import CreateJob from "@/CreateJob.svelte";

    let { data } = $props();

    // This function checks all associated groups and selects the ones where the user can add jobs to them.
    function validJobSetGroups() {
        let validGroups: { id: string, name: string }[] = [];
        for (let i=0;i<data.associatedGroups.length;i++) {
            if (data.associatedGroups[i].owner === data.user.id) {
                validGroups.push({ id: data.associatedGroups[i].id, name: data.associatedGroups[i].name });
                continue;
            }
            if (data.associatedGroups[i].othersCanContribute && data.associatedGroups[i].members.includes(data.user.id)) {
                validGroups.push({ id: data.associatedGroups[i].id, name: data.associatedGroups[i].name });
                continue;
            }
        }
        return validGroups;
    }
</script>

<svelte:head>
    <title>Add Job | Task Giver</title>
</svelte:head>

<section class="groups p-4 md:p-8">
    <section class="container mx-auto">
        <Card.Root class="w-full max-w-2xl mx-auto">
            <Card.Header>
                <Card.Title>Create New Job</Card.Title>
                <Card.Description>Fill out the form below to create a new job posting.</Card.Description>
            </Card.Header>
            <Card.Content>
                <CreateJob createJobForm={data.createJobForm} validGroups={validJobSetGroups()} />
            </Card.Content>
        </Card.Root>
    </section>
</section>

<style>
    .groups {
        max-height: calc(100vh - 70px);
        max-height: calc(100dvh - 70px);
        height: 100dvh;
        overflow-y: auto;
        background-color: #ffffff;
    }
</style>