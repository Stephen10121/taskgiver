<script lang="ts">
    const { date }: { date: string } = $props();

    const newDate = new Date(date);

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][newDate.getMonth()];
    const year = newDate.getFullYear();
    const day = newDate.getDate();
</script>

<span>Created on {month} {day}, {year}</span>