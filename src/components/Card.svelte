<script>
	import { link, colors, padding, rounded, shadow, editable } from './utils'
	import getComponent from './index'
	export let blok

	function classes(b) {
		let horizontal = b.horizontal_layout ? 'row' : '',
			background = b.media_as_background ? 'background' : ''
		return horizontal + ' ' + background + ' ' + blok.class
	}

	function styles(b) {
		return colors(b) + rounded(b) + shadow(b) + b.style
	}
</script>

<a
	href={link(blok.action).href}
	aria-label={link(blok.action).aria}
	class="card colors {classes(blok)}"
	style={styles(blok)}
	use:editable={blok}
>
	<div class="card-container">
		<div class="card-media">
			{#each blok.media as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</div>
		<div class="card-content" style={padding(blok)}>
			{#each blok.content as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</div>
	</div>
	{#if blok.show_divider}
		<div class="card-divider" />
	{/if}
	<div class="card-actions" style={padding(blok)}>
		{#each blok.actions as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</div>
</a>
