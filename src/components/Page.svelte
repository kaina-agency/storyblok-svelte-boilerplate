<script>
	import getComponent from './index'
	export let blok
</script>

<div class="page">
	{#each blok.body as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</div>

<style>
	.page {
		margin-bottom: 2rem;
	}
</style>
