<script>
	import { onMount } from 'svelte'
	import { lock, unlock } from 'tua-body-scroll-lock'
	let debounce = require('lodash/debounce')
	import { editable } from './utils'
	import getComponent from './index'
	export let blok
	let el, type, position

	function open() {
		el.open = true
		if (type === 'modal') lock(el)
	}

	function toggle() {
		if (el.open === false) {
			if (type === 'modal') lock(el)
		} else {
			if (type === 'modal') unlock(el)
			setTimeout(() => {
				el.open = false
			}, 5)
		}
	}

	function menuPosition() {
		type = blok.modal_type
		if (blok.menu_position === 'auto') {
			position = el.offsetLeft < window.innerWidth / 2 ? 'left' : 'right'
		} else position = blok.menu_position
		if (window.innerWidth < Number(blok.width) + 200) {
			type = 'modal'
		}
	}

	onMount(() => {
		// dynamically set position
		if (blok.modal_type === 'menu') {
			menuPosition()
			setTimeout(menuPosition, 500)
			window.addEventListener('resize', debounce(menuPosition, 500))
		} else type = 'modal'
		// click outside closes modal
		window.addEventListener('click', (e) => {
			if (el.open) {
				if (!e.path.includes(el)) {
					toggle()
				}
			}
		})
		// any .close-button class closes modal
		let dynamicCloseButton = el.querySelector('.close-modal')
		if (dynamicCloseButton) {
			dynamicCloseButton.style.cursor = 'pointer'
			dynamicCloseButton.addEventListener('click', () => {
				toggle()
			})
		}
		// auto-open settings
		if (blok.auto_open_delay) {
			if (blok.only_show_once) {
				if (!localStorage.getItem(blok._uid)) {
					setTimeout(open, blok.auto_open_delay * 1000)
					localStorage.setItem(blok._uid, true)
				}
			} else {
				setTimeout(open, blok.auto_open_delay * 1000)
			}
		}
	})
</script>

<details class="{type} {position}" bind:this={el} use:editable={blok}>
	<summary on:click={toggle}>
		{#each blok.initiator as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</summary>
	<div class="{type}-container">
		<div
			class="{type}-content"
			style="width: {blok.menu_position !== 'fit' ? blok.width + 'px' : ''}"
		>
			{#each blok.content as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
			<button
				class="{type}-content-close"
				on:click={toggle}
				aria-label="Close the modal"
			>
				{#each blok.close_button as blok}
					<svelte:component this={getComponent(blok.component)} {blok} />
				{/each}
			</button>
		</div>
	</div>
</details>
