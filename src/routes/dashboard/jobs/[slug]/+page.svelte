<script lang="ts">
    import ShowDateCreated from "@/groupSection/aboutGroup/ShowDateCreated.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { CalendarDays, Users, BriefcaseBusiness, UserPen, Handshake } from "@lucide/svelte";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    const { data } = $props();

    console.log(data);
</script>

<svelte:head>
    <title>{data.job.jobData.title} | {data.job.jobData.jobGroup.name}</title>
</svelte:head>

<main class="bg-background p-6">
    <div class="max-w-4xl mx-auto">
        <div class="space-y-6">
            <div class="flex items-center gap-3">
                <BriefcaseBusiness class="h-8 w-8 text-primary" />
                <div>
                    <h1 class="text-3xl font-bold">{data.job.jobData.title}</h1>
                    <div class="flex items-center gap-2 text-muted-foreground mt-1">
                        <CalendarDays class="h-4 w-4" />
                        <ShowDateCreated date={data.job.jobData.created} /> -
                        <ShowDateCreated happening date={data.job.jobData.jobDate} />
                    </div>
                </div>
            </div>
            <div>
                <p>{data.job.jobData.details}</p>
            </div>
            <Card.Root>
                <Card.Header>
                    <Card.Title class="flex items-center gap-2">
                        <Handshake class="h-5 w-5" />
                        Volunteers ({data.job.jobData.volunteers.length}/{data.job.jobData.volunteersNeeded})
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <div class="space-y-4">
                        {#if data.job.jobData.volunteers.length > 0}
                            {#each data.job.jobData.volunteers as volunteer (`jobvolunteerlist${volunteer.name}`)}
                                <div class="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                                    <div class="flex items-center gap-3">
                                        <Avatar.Root class="h-10 w-10">
                                            <Avatar.Image src={volunteer.avatar} alt={volunteer.name} />
                                            <Avatar.Fallback class="bg-primary/10 text-primary font-medium">
                                                {volunteer.name.split(" ").map(((n) => n[0])).join("")}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                        <div>
                                            <h3 class="font-medium">{volunteer.name}</h3>
                                            <p class="text-sm text-muted-foreground">{volunteer.email}</p>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {:else}
                            <p>No Volunteers yet :(</p>
                        {/if}
                    </div>
                </Card.Content>
            </Card.Root>
            <Card.Root>
                <Card.Header>
                    <Card.Title class="flex items-center gap-2">
                        <Users class="h-5 w-5" />
                        Group
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <div class="flex items-center gap-3">
                                <Avatar.Root class="h-10 w-10">
                                    <Avatar.Image src={data.job.jobData.jobGroup.avatar} alt={data.job.jobData.jobGroup.name} />
                                    <Avatar.Fallback class="bg-primary/10 text-primary font-medium">
                                        {data.job.jobData.jobGroup.name.split(" ").map(((n) => n[0])).join("")}
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <div>
                                    <h3 class="font-medium">{data.job.jobData.jobGroup.name}</h3>
                                    <a class="text-sm text-muted-foreground underline" href="/dashboard/groups/{data.job.jobData.jobGroup.id}">/dashboard/groups/{data.job.jobData.jobGroup.id}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>
            <Card.Root>
                <Card.Header>
                    <Card.Title class="flex items-center gap-2">
                        <UserPen class="h-5 w-5" />
                        Issued by
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                            <div class="flex items-center gap-3">
                                <Avatar.Root class="h-10 w-10">
                                    <Avatar.Image src={data.job.jobData.issuedBy.avatar} alt={data.job.jobData.issuedBy.name} />
                                    <Avatar.Fallback class="bg-primary/10 text-primary font-medium">
                                        {data.job.jobData.issuedBy.name.split(" ").map(((n) => n[0])).join("")}
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <div>
                                    <h3 class="font-medium">{data.job.jobData.issuedBy.name}</h3>
                                    <p class="text-sm text-muted-foreground">{data.job.jobData.issuedBy.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>