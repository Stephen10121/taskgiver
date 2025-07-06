<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { createGroupSchema, type CreateGroupSchema } from "@/schema";
    import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import * as Form from "$lib/components/ui/form/index.js";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from "svelte-sonner";

    let { data }: { data: { createGroupForm: SuperValidated<Infer<CreateGroupSchema>> } } = $props();

    const createGroupFormActual = superForm(data.createGroupForm, {
        validators: zodClient(createGroupSchema),
        onUpdate: ({ form: f }) => {
            if (f.valid) {
                if (f.valid) {
                    toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
                } else {
                    toast.error("Please fix the errors in the form.");
                }
            }
        }
    });

    const { form: formData, enhance } = createGroupFormActual;
</script>

<Drawer.Root>
    <Drawer.Trigger>
        <button class="poppins-semibold createGroup">Create A Group</button>
    </Drawer.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Create a group</Drawer.Title>
            <Drawer.Description>All groups are private by default. You can add users to your group by sharing the group ID.</Drawer.Description>
        </Drawer.Header>
        <form method="post" use:enhance id="creategroupform" action="?/createGroup">
            <Form.Field form={createGroupFormActual} name="groupName">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Group Name</Form.Label>
                        <Input {...props} bind:value={$formData.groupName} placeholder='e.g. "Food Helpers Group"' />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors>
                    {#snippet children({ errors, errorProps })}
                        {#each errors as err}
                            <span style="color: red;" {...errorProps}>{err}</span>
                        {/each}
                    {/snippet}
                </Form.FieldErrors>
            </Form.Field>
            <Form.Field form={createGroupFormActual} name="groupId">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Group ID</Form.Label>
                        <Input {...props} bind:value={$formData.groupId} placeholder='e.g. "foodgroup1"' />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field form={createGroupFormActual} name="groupPassword">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Group Password</Form.Label>
                        <Input {...props} type="password" bind:value={$formData.groupPassword} placeholder='Password' />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field form={createGroupFormActual} name="repeatGroupPassword">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Repeat Group Password</Form.Label>
                        <Input {...props} type="password" bind:value={$formData.repeatGroupPassword} placeholder='Repeat Password' />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field form={createGroupFormActual} name="othersCanContribute">
                <Form.Control>
                    {#snippet children({ props })}
                        <div class="flex items-center space-x-2">
                            <Switch {...props} style="--primary:205deg 80% 57%;" id="all-can-contribute" checked={$formData.othersCanContribute} />
                            <Form.Label for="all-can-contribute">Anyone can add tasks</Form.Label>
                        </div>
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </form>
        <Drawer.Footer>
            <Button type="submit" form="creategroupform" style="background-color: #3aa0e9;">Create Group</Button>
            <Drawer.Close>Cancel</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>

<style>
    .createGroup {
        background-color: #3aa0e9;
        width: 100%;
        height: 55px;
        border-radius: 10px;
        font-size: 20px;
        color: #ffffff;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 0 15px;
    }
</style>