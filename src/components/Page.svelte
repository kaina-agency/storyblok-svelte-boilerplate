<script>
	import getComponent from './index'
	import Meta from '../components/Meta.svelte'
	export let blok
</script>

<div class="page">
	{#each blok.body as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</div>

<Meta meta={blok.meta} image={blok.meta_image} />

<style>
	.page {
		margin-bottom: 2rem;
	}
</style>
