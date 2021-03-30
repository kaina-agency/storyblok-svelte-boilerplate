<script>
	import { colors, padding, rounded, shadow, editable } from './utils'
	import getComponent from './index'
	export let blok
	let accordion

	function styles(b) {
		return colors(b) + rounded(b) + shadow(b) + b.style
	}

	function arrowPadding(b) {
		let val = padding(b).replace('padding: ', '').replace(';', '')
		return `right: calc(${val} - .24rem);`
	}

	function fixCorners() {
		let prev = accordion.previousElementSibling
		if (prev) {
			!accordion.open
				? prev.classList.add('fix-bottom')
				: prev.classList.remove('fix-bottom')
		}
	}
</script>

<details
	bind:this={accordion}
	class="accordion colors"
	style={styles(blok)}
	on:click={fixCorners}
	use:editable={blok}
>
	<summary style={padding(blok)}>
		{#each blok.header as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
		<div class="arrow" style={arrowPadding(blok)}>
			{@html blok.icon}
		</div>
	</summary>
	<div class="accordion-content" style={padding(blok)}>
		{#each blok.content as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</div>
</details>
