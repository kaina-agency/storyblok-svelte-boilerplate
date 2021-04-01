<script>
	import { colors, padding, rounded, shadow } from './utils'
	import Link from './Link.svelte'
	import getComponent from './index'
	export let blok

	function classes(b) {
		let background = b.media_is_background ? 'background' : ''
		return background + ' ' + blok.class
	}

	function styles(b) {
		return colors(b) + rounded(b) + shadow(b) + b.style
	}
</script>

<Link classes="card colors {classes(blok)}" styles={styles(blok)} {blok}>
	<div class="card-container {blok.horizontal_layout ? 'row' : ''}">
		<div class="card-media">
			{#each blok.media as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</div>
		{#if blok.content.length}
			<div class="card-content" style={padding(blok)}>
				{#each blok.content as blok}
					<svelte:component this={getComponent(blok.component)} {blok} />
				{/each}
			</div>
		{/if}
	</div>
	{#if blok.show_divider}
		<div class="card-divider" />
	{/if}
	{#if blok.actions.length}
		<div class="card-actions" style={padding(blok)}>
			{#each blok.actions as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</div>
	{/if}
</Link>
