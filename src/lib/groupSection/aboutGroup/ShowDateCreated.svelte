<script lang="ts">
    const { date = $bindable(), happening = false }: { date: string, happening?: boolean } = $props();

    let newDate = $derived(new Date(date));

    let month = $derived(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][newDate.getMonth()]);
    let year = $derived(newDate.getFullYear());
    let day = $derived(newDate.getDate());
    let happened = $derived((new Date()) > newDate);
    
</script>

{#if happening}
    <span>Happen{happened ? "ed" : "ing"} on {month} {day}, {year}</span>
{:else}
    <span>Created on {month} {day}, {year}</span>
{/if}