<script>
	import { responsive, editable } from './utils'
	import getComponent from './index'

	export let blok
	let selector = '#b-' + blok._uid,
		rule = 'grid-column: span @ / span @;'
</script>

<div
	id="b-{blok._uid}"
	class="{blok.hide_on_breakpoint} {blok.class}"
	use:editable={blok}
>
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</div>

<svelte:head>
	{@html responsive(selector, rule, blok.responsive)}
</svelte:head>
