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
		if (blok.menu_position === 'auto') {
			position = el.offsetLeft < window.innerWidth / 2 ? 'left' : 'right'
		} else position = blok.menu_position
	}

	onMount(() => {
		// dynamically set position
		setTimeout(menuPosition, 500)
		window.addEventListener('resize', debounce(menuPosition, 500))
		// click outside and escape key closes dropdown
		window.addEventListener('click', (e) => {
			if (el.open && !content.contains(e.target)) toggle()
		})
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && el.open) el.open = false
		})
		// any el.close closes dropdown
		let dynamicCloseButton = content.querySelector('.close')
		if (dynamicCloseButton) {
			dynamicCloseButton.style.cursor = 'pointer'
			dynamicCloseButton.addEventListener('click', () => {
				toggle()
			})
		}
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
