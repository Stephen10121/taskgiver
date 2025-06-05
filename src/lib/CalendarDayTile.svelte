<script lang="ts">
    const { year, month, day, dayClicked }: { year: number, month: number, day: number, dayClicked: (day: Date) => unknown } = $props();

    let thisDay = $derived(new Date(year, month, day));
</script>

<button onclick={() => dayClicked(thisDay)} class="calcol {thisDay.getMonth() === month ? "thismonth" : "notthismonth"}">
    <p class="day poppins-semibold">{thisDay.getDate()}</p>
</button>

<style>
    .calcol {
        border: 1px solid #000000;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .notthismonth {
        opacity: 0.5;
    }

    .day {
        position: absolute;
        top: 0;
        right: 5px;
    }
</style>