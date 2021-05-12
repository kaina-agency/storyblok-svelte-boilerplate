<script>
	import { editable } from './utils'
	import getComponent from './index'
	export let blok
</script>

<div class="container" use:editable={blok}>
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</div>

<style>
	.container {
		padding: 1rem 0.75rem;
		margin: 0 auto;
	}
	@media (min-width: 768px) {
		.container {
			padding: 1rem;
			max-width: 80vw;
		}
	}
	@media (min-width: 1600px) {
		.container {
			max-width: 1280px;
		}
	}
</style>
