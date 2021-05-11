<script>
	import { onMount } from 'svelte'
	let debounce = require('lodash/debounce')
	import { editable } from './utils'
	import getComponent from './index'
	export let blok
	let el, content, position

	function toggle() {
		el.open = !el.open
	}

	function menuPosition() {
		position = el.offsetLeft < window.innerWidth / 2 ? 'left' : 'right'
	}

	onMount(() => {
		// dynamically set position
		if (blok.menu_position === 'auto') {
			setTimeout(menuPosition, 500)
			window.addEventListener('resize', debounce(menuPosition, 500))
		} else position = blok.menu_position
		// click outside closes dropdown
		window.addEventListener('click', (e) => {
			if (el.open && !content.contains(e.target)) toggle()
		})
		// escape key closes dropdown
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && el.open) el.open = false
		})
		// any a or .close closes dropdown
		content.querySelectorAll('a.Link').forEach((el) => {
			el.style.cursor = 'pointer'
			el.addEventListener('click', () => {
				toggle()
			})
		})
	})
</script>

<details class="dropdown {position}" bind:this={el} use:editable={blok}>
	<summary>
		{#each blok.open as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</summary>
	<div class="dropdown-content" bind:this={content}>
		{#each blok.content as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</div>
</details>
