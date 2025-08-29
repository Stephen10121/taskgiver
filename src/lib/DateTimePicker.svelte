<script lang="ts">
    import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import CalendarIcon from "@lucide/svelte/icons/calendar";
    import { cn } from "$lib/utils.js";
    import Slider from "./Slider.svelte";

    let { value = $bindable() }: { value: Date | undefined } = $props();
    
    const df = new DateFormatter("en-US", { dateStyle: "long" });
    let datePickerValue = $state<DateValue | undefined>();
    let timeAdderValue = $state<{ hour: number, minute: number, pm: boolean }>({ hour: 12, minute: 0, pm: false })
    let datePickerContentRef = $state<HTMLElement | null>(null);

    function setDate(newDate: DateValue, hourAndMinute: { hour: number, minute: number, pm: boolean }) {
            let newValue = newDate.toDate(getLocalTimeZone());
            newValue.setHours(hourAndMinute.pm ? 12 + hourAndMinute.hour : hourAndMinute.hour);
            newValue.setMinutes(hourAndMinute.minute);
            return newValue;
    }

    $effect(() => {
        timeAdderValue;
        if (datePickerValue) {
            value = setDate(datePickerValue, timeAdderValue);
        } else {
            value = undefined;
        }
    });
</script>

<Popover.Root>
    <Popover.Trigger
        class={cn(
            buttonVariants({
                variant: "outline",
                class: "justify-start text-left font-normal"
            }),
            !datePickerValue && "text-muted-foreground"
        )}
    >
        <CalendarIcon />
        {datePickerValue ? df.format(datePickerValue.toDate(getLocalTimeZone())) : "Pick a date and time"}
    </Popover.Trigger>
    <Popover.Content bind:ref={datePickerContentRef} class="w-auto p-0 flex">
        <Calendar type="single" bind:value={datePickerValue} />
        <div class="p-2 flex flex-col gap-3">
            <p class="text-sm">Timezone: <span class="font-bold">{getLocalTimeZone()}</span></p>
            <label>
                <p class="font-bold text-sm">Hour</p>
                <Input type="number" bind:value={timeAdderValue.hour} max="12" min="1" />
            </label>
            <label>
                <p class="font-bold text-sm">Minute</p>
                <Input type="number" bind:value={timeAdderValue.minute} max="60" min="0" />
            </label>
            <Slider val1Label="AM" val2Label="PM" bind:isVal2={timeAdderValue.pm} />
        </div>
    </Popover.Content>
</Popover.Root>