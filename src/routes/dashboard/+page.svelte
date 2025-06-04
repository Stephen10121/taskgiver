<script lang="ts">
    import EventButton from '@/EventButton.svelte';

    const { data } = $props();
</script>

<section class="homepage">
    <h1 class="poppins-semibold">Welcome</h1>
    <h2 class="poppins-semibold">{data.user.name}</h2>

    <section class="comingup">
        <p class="poppins-semibold text-3xl">Coming up</p>
        <section class="comingupeventlist">
            <EventButton name="Babysitting" toWhom="Galina Shapoval" time="Tomorrow 10:30 PM" />
            <EventButton name="Food Delivery" toWhom="Tanya Gruzin" time="Friday 18th 10:30 PM" />
        </section>
        <p class="poppins-semibold text-3xl mt-2">Available</p>
        <section class="availableeventlist">
            <EventButton name="Food Delivery" toWhom="Galina Shapoval" time="Tomorrow 10:30 PM" />
            <EventButton name="Babysitting" toWhom="Tanya Gruzin" time="Friday 18th 10:30 PM" />
        </section>
    </section>
</section>

<style>
    .homepage {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 40px;
        padding-left: 20px;
        padding-right: 20px;
        overflow-y: auto;
    }

    h1 {
        font-size: 60px;
    }

    h2 {
        color: #3A9FE9;
        font-size: 35px;
    }

    .comingup {
        width: 100%;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .comingupeventlist,
    .availableeventlist {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
