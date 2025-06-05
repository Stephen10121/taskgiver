<script lang="ts">
    import CalendarDayTile from "./CalendarDayTile.svelte";

    let selectedMonth = $state(5);
    let selectedYear = $state(2025);

    let firstDate = $derived(new Date(selectedYear, selectedMonth, 1));
    let offsetFromSunday = $derived(firstDate.getDay());

    $inspect(firstDate, offsetFromSunday);

    function clickedDay(day: Date) {
        console.log(day);
    }

    function increaseMonth() {
        if (selectedMonth === 11) {
            selectedMonth = 0;
            selectedYear = selectedYear + 1;
        } else {
            selectedMonth = selectedMonth + 1;
        }
    }

    function decreaseMonth() {
        if (selectedMonth === 0) {
            selectedMonth = 11;
            selectedYear = selectedYear - 1;
        } else {
            selectedMonth = selectedMonth - 1;
        }
    }
</script>
<button onclick={increaseMonth}>Increase</button>
<button onclick={decreaseMonth}>Decrease</button>
<p>{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][selectedMonth]} {selectedYear}</p>
<section class="calendar">
    {#each [0, 1, 2, 3, 4] as row (`calendarrow${row}`)}
        <section class="calrow">
            {#each [0, 1, 2, 3, 4, 5, 6] as col (`calendarrowcol${row}/${col}`)}
                <CalendarDayTile year={selectedYear} month={selectedMonth} day={row * 7 + col + 1 - offsetFromSunday} dayClicked={clickedDay} />
            {/each}
        </section>
    {/each}
</section>

<style>
    .calendar {
        border-top: 1px solid #000000;
        border-bottom: 1px solid #000000;
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        width: 100%;
        height: 100%;
    }

    .calrow {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
</style>