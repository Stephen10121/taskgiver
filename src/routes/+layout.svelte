<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(html), :global(body) {
		background-color: #DFDFDF;
	}
</style>