<script lang="ts">
    import homeImg from "$lib/assets/home.svg";
    import calendarImg from "$lib/assets/calendar.svg";
    import groupsImg from "$lib/assets/groups.svg";
    import addJobImg from "$lib/assets/addjob.svg";

	let { children, data } = $props();
</script>

<section>
    <main>
        {@render children()}
    </main>
    <footer>
        <a href="/dashboard" class="{data.pathname === "/dashboard" ? "selected" : ""}">
            <img src={homeImg} alt="Home">
        </a>
        <a href="/dashboard/calendar" class="{data.pathname === "/dashboard/calendar" ? "selected" : ""}">
            <img src={calendarImg} alt="Calendar">
        </a>
        <a href="/dashboard/groups" class="{data.pathname === "/dashboard/groups" ? "selected" : ""}">
            <img src={groupsImg} alt="Groups">
        </a>
        <a href="/dashboard/addJob" class="{data.pathname === "/dashboard/addJob" ? "selected" : ""}">
            <img src={addJobImg} alt="Add Job">
        </a>
        <a href="/dashboard/settings" class="{data.pathname === "/dashboard/settings" ? "selected" : ""}">
            <img class="avatar" src={data.avatar} alt="User Avatar" />
        </a>
    </footer>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: calc(100vh - 70px) 70px;
        grid-template-rows: calc(100dvh - 70px) 70px;
    }

    main {
        width: 100%;
        height: 100%;
    }

    footer {
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 10px 0;
        background-color: #AAAAAA;
    }

    a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a.selected {
        opacity: 0.6;
    }

    a img {
        height: 100%;
    }

    img.avatar {
        border-radius: 100%;
    }
</style>