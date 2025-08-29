<script lang="ts">
    import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { createJobSchema, type CreateJobSchema } from "@/schema";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Form from "$lib/components/ui/form/index.js";
    import { toast } from "svelte-sonner";
    import DateTimePicker from "./DateTimePicker.svelte";

    let { createJobForm, validGroups }: { createJobForm: SuperValidated<Infer<CreateJobSchema>>, validGroups: { id:string, name:string }[] } = $props();

    const createJobFormActual = superForm(createJobForm, {
        id: "createJobForm",
        validators: zodClient(createJobSchema),
        onUpdate: ({ form: f }) => {
            if (!f.valid) {
                toast.error("Please fix the errors in the form.");
            }
        },
        onResult: (res) => {
            const responseResult = res.result as any;
            if (res.result.status === 200) {
                toast.success(responseResult.data ? responseResult.data.msg : "Success");
            } else if (res.result.status === 400) {
                if (responseResult.data && responseResult.data.msg) toast.error(responseResult.data.msg);
            } else if (res.result.status === 500) {
                if (responseResult.data && responseResult.data.msg) toast.error(responseResult.data.msg);
            }
        }
    });

    const { form: formData, enhance } = createJobFormActual;
    const triggerContent = $derived(validGroups.find((f) => f.id === $formData.jobGroup)?.name ?? "Select a group");
</script>

        <form method="post" use:enhance id="createjobform" action="?/createJob" class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Field form={createJobFormActual} name="jobTitle" id="jobTitle" class="space-y-2">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Title *</Form.Label>
                            <Input {...props} bind:value={$formData.jobTitle} placeholder='e.g. "Food for John Doe"' />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field form={createJobFormActual} name="jobGroup" id="jobGroup" class="space-y-2">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Group *</Form.Label>
                            <Select.Root type="single" bind:value={$formData.jobGroup} {...props}>
                                <Select.Trigger>{triggerContent}</Select.Trigger>
                                <Select.Content>
                                    <Select.Group>
                                        {#each validGroups as validGroup (`groupList${validGroup.id}`)}
                                            <Select.Item value={validGroup.id} label={validGroup.name}>{validGroup.name}</Select.Item>
                                        {/each}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Field form={createJobFormActual} name="jobClient" id="jobClient" class="space-y-2">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Client *</Form.Label>
                            <Input {...props} bind:value={$formData.jobClient} placeholder='e.g. "John Doe"' />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field form={createJobFormActual} name="jobAddress" class="space-y-2">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Address</Form.Label>
                            <Input {...props} bind:value={$formData.jobAddress} placeholder='Address' />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Field form={createJobFormActual} name="jobDateTime" class="space-y-2 mt-[10px] flex flex-col">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Date & Time *</Form.Label>
                            <DateTimePicker bind:value={$formData.jobDateTime} />
                            <Input {...props} bind:value={$formData.jobDateTime} type="hidden" />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field form={createJobFormActual} name="jobVolunteerAmount" class="space-y-2">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Number of Volunteers *</Form.Label>
                            <Input {...props} type="number" bind:value={$formData.jobVolunteerAmount} />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
        
            <Form.Field form={createJobFormActual} name="jobDetails" id="jobDetails" class="space-y-2">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Job Details *</Form.Label>
                        <Textarea style="max-height: 200px;" {...props} bind:value={$formData.jobDetails} placeholder='Description' />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            
            <Form.Field form={createJobFormActual} name="jobNotifyGroup">
                <Form.Control>
                    {#snippet children({ props })}
                        <div class="flex items-center space-x-2">
                            <Switch {...props} style="--primary:205deg 80% 57%;" id="allcancontribute" checked={$formData.jobNotifyGroup} />
                            <Form.Label for="allcancontribute">Notify group about this job.</Form.Label>
                        </div>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Button type="submit" class="w-full" form="createjobform">Create Job</Button>
        </form>