<script>
	import { onMount } from 'svelte'
	import { DialogOverlay, DialogContent } from 'svelte-accessible-dialog'
	import getComponent from './index'
	export let blok
	let isOpen

	function open() {
		isOpen = true
	}

	function close() {
		isOpen = false
	}

	onMount(() => {
		// auto-open settings
		if (blok.auto_open_delay && blok.auto_open_delay > 0) {
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

<button class="modal-open" on:click={open}>
	{#each blok.open as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</button>

<DialogOverlay {isOpen} onDismiss={close} class="modal-overlay">
	<DialogContent aria-label={blok.accessible_label} class="modal">
		<button class="modal-close" on:click={close}>
			{#each blok.close as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</button>
		<div class="modal-content">
			{#each blok.content as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</div>
	</DialogContent>
</DialogOverlay>

<style>
	.modal-open,
	.modal-close {
		padding: 0;
		background: none;
		border: none;
	}
	.modal-close {
		position: absolute;
		top: 0;
		right: 0;
		height: 0;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
	}
	:global([data-svelte-dialog-overlay].modal-overlay) {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 30;
	}
	:global([data-svelte-dialog-content].modal) {
		margin: 0;
		padding: 0;
		background: unset;
		position: relative;
		width: auto;
	}
	:global(.modal-content > *) {
		max-width: 80vw;
	}
</style>
