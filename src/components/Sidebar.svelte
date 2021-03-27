<script>
	import { colors, padding, rounded, shadow, editable } from './utils'
	import getComponent from './index'
	export let blok

	function styles(b) {
		return colors(b) + padding(b) + rounded(b) + shadow(b) + b.style
	}
</script>

<aside
	class="sidebar colors {blok.class}"
	style={styles(blok)}
	use:editable={blok}
>
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</aside>
