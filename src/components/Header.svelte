<script>
	import { colors, padding, rounded, shadow, editable } from './utils'
	import getComponent from './index'
	export let blok

	function styles(b) {
		return colors(b) + padding(b) + rounded(b) + shadow(b) + b.style
	}
</script>

<nav
	class="header colors {blok.sticky ? 'sticky' : ''}"
	style={styles(blok)}
	use:editable={blok}
>
	<button class="sidebar-button">{@html blok.icon}</button>
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</nav>
