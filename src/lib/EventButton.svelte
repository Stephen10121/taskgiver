<script lang="ts">
    const { name, toWhom, time }: { name: string, toWhom: string, time: string } = $props();
</script>

<button>
    <p class="poppins-semibold text-xl">{name}</p>
    <p class="whom poppins-regular">{toWhom}</p>
    <p class="time poppins-semibold text-sm">{time}</p>
</button>

<style>
    button {
        width: 100%;
        height: 70px;
        border: 1px solid #000000;
        border-radius: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 0 10px;
        gap: 2px;
    }

    .time {
        position: absolute;
        top: 5px;
        right: 10px;
    }

    .whom {
        color: #716B6B;
    }
</style>