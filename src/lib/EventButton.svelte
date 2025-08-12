<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    const { name, toWhom, time, onclick, href }: { name: string, toWhom: string, time?: string, onclick?: MouseEventHandler<HTMLButtonElement>, href?: string } = $props();
</script>

{#if href}
    <a {href}>
        <p class="poppins-semibold text-xl">{name}</p>
        <p class="whom poppins-regular">{toWhom}</p>
        {#if time}
            <p class="time poppins-semibold text-sm">{time}</p>
        {/if}
    </a>
{:else}
    <button {onclick}>
        <p class="poppins-semibold text-xl">{name}</p>
        <p class="whom poppins-regular">{toWhom}</p>
        {#if time}
            <p class="time poppins-semibold text-sm">{time}</p>
        {/if}
    </button>
{/if}

<style>
    button,
    a {
        text-decoration: none;
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