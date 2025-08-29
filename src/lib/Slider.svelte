<script lang="ts">
    let { val1Label, val2Label, isVal2 = $bindable() }: { val1Label: string, val2Label: string, isVal2: boolean } = $props();
</script>

<label>
    <input type="checkbox" class="sr-only" bind:checked={isVal2} />
    <div class="slider">
        <div class="v1">
            <p class="font-bold text-sm">{val1Label}</p>
        </div>
        <div class="v2">
            <p class="font-bold text-sm">{val2Label}</p>
        </div>
        <div class="mover"></div>
    </div>
</label>

<style>
    .slider {
        background-color: #dfdfdf;
        display: flex;
        width: fit-content;
        padding: 5px 10px;
        column-gap: 10px;
        border-radius: 5px;
        position: relative;
        isolation: isolate;
        cursor: pointer;
    }

    .mover {
        position: absolute;
        width: calc(50% - 1px);
        height: calc(100% - 6px);
        top: 3px;
        left: 3px;
        border-radius: 5px;
        background-color: black;
        transform: translateX(0);
        z-index: -1;
        transition: transform 0.15s linear;
    }

    .v1 p {
        color: #ffffff;
        transition: color 0.15s linear;
    }

    .v2 p {
        color: #000000;
        transition: color 0.15s linear;
    }

    input[type="checkbox"]:checked + div .v1 p {
        color: #000000;
    }

    input[type="checkbox"]:checked + div .v2 p {
        color: #ffffff;
    }

    input[type="checkbox"]:checked + div .mover {
        width: calc(50% - 3px);
        transform: translateX(calc(100% - 1px));
    }

    p {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>