<script lang="ts">
    import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { joinGroupSchema, type JoinGroupSchema } from "@/schema";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Form from "$lib/components/ui/form/index.js";
    import { toast } from "svelte-sonner";

    let { data }: { data: { joinGroupForm: SuperValidated<Infer<JoinGroupSchema>> } } = $props();
    let dialogOpen = $state(false);

    const joinGroupFormActual = superForm(data.joinGroupForm, {
        id: "joinGroupForm",
        validators: zodClient(joinGroupSchema),
        onUpdate: ({ form: f }) => {
            if (!f.valid) {
                toast.error("Please fix the errors in the form.");
            }
        },
        onResult: (res) => {
            const responseResult = res.result as any;
            if (res.result.status === 200) {
                toast.success(responseResult.data ? responseResult.data.msg : "Success");
                dialogOpen = false;
            } else if (res.result.status === 400) {
                if (responseResult.data && responseResult.data.msg) toast.error(responseResult.data.msg);
            } else if (res.result.status === 500) {
                if (responseResult.data && responseResult.data.msg) toast.error(responseResult.data.msg);
            }
        }
    });

    const { form: formData, enhance } = joinGroupFormActual;
</script>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger class={buttonVariants({ variant: "default" })} style="background-color:#EE3F3F;">Join A Group</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Join a group</Dialog.Title>
            <Dialog.Description>
                You must know the ID and password of the group you want to join.
            </Dialog.Description>
        </Dialog.Header>
        <form method="post" use:enhance id="joingroupform" action="?/joinGroup">
            <Form.Field form={joinGroupFormActual} name="groupId" id="groupId">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Group ID</Form.Label>
                        <Input {...props} bind:value={$formData.groupId} placeholder='e.g. "foodgroup1"' />
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
            <Form.Field form={joinGroupFormActual} name="groupPassword" id="groupPassword">
                <Form.Control>
                    {#snippet children({ props })}
                        <Form.Label>Group Password</Form.Label>
                        <Input {...props} type="password" bind:value={$formData.groupPassword} placeholder='Password' />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </form>
        <Dialog.Footer>
            <Button type="submit" form="joingroupform" style="background-color: #EE3F3F;">Join Group</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<style>
    .joinGroup {
        background-color: #EE3F3F;
        width: 100%;
        height: 55px;
        border-radius: 10px;
        font-size: 20px;
        color: #ffffff;
    }

    form {
        display: flex;
        flex-direction: column;
    }
</style>