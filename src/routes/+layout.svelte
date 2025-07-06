<script lang="ts">
	import '../app.css';
	import { Toaster } from "$lib/components/ui/sonner/index.js";

	let { children } = $props();
</script>

<Toaster />

{@render children()}

<style>
	:global(html), :global(body) {
		background-color: #DFDFDF;
		width: 100vw;
		height: 100vh;
		height: 100dvh;
	}
</style>