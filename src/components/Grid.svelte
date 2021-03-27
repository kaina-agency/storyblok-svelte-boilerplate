<script>
	import { responsive, editable } from './utils'
	import getComponent from './index'

	export let blok
	let selector = '#b-' + blok._uid,
		rule = 'grid-template-columns: repeat(@, minmax(0, 1fr));'
</script>

<div
	id="b-{blok._uid}"
	class="grid {blok.class}"
	style="gap: {blok.gap * 0.25}rem; align-items: {blok.alignment}; {blok.style}"
	use:editable={blok}
>
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</div>

<svelte:head>
	{@html responsive(selector, rule, blok.columns)}
</svelte:head>
