<script>
	import getComponent from './index'
	export let blok
</script>

<div class="container">
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</div>

<style>
	.container {
		padding: 1rem 0.75rem;
		margin: 0 auto;
		transition: 0.25s;
	}
	@media (min-width: 768px) {
		.container {
			padding: 1rem;
			max-width: 768px;
		}
	}
	@media (min-width: 1024px) {
		.container {
			max-width: 1024px;
		}
	}
	@media (min-width: 1280px) {
		.container {
			max-width: 1280px;
		}
	}
</style>
