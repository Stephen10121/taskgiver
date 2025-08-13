<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { navigating } from '$app/state';
    import Navigating from '@/Navigating.svelte';

	let { children } = $props();
</script>

{#if navigating.complete}
	<Navigating />
{/if}

<Toaster />

{@render children()}