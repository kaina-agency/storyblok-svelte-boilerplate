<script>
	import { onMount } from 'svelte'
	import { editable } from './utils'
	import { lock, unlock } from 'tua-body-scroll-lock'
	import getComponent from './index'
	export let blok
	let modal, openButton, closeButton
	let open = false

	function trapFocus() {
		let focusable = modal.querySelectorAll('a, button, input, select, textarea')
		focusable[0].addEventListener('keydown', (e) => {
			if ((e.key === 'Tab') & e.shiftKey) {
				e.preventDefault()
				focusable[focusable.length - 1].focus()
			}
		})
		focusable[focusable.length - 1].addEventListener('keydown', (e) => {
			if ((e.key === 'Tab') & !e.shiftKey) {
				e.preventDefault()
				focusable[0].focus()
			}
		})
	}

	function openModal() {
		lock(modal)
		open = true
		closeButton.focus()
	}

	function closeModal() {
		unlock(modal)
		open = false
		openButton.focus()
	}

	onMount(() => {
		document.body.appendChild(modal) // move to end

		trapFocus()

		// auto-open
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

<button
	class="modal_open"
	aria-label="Open dialog"
	on:click={openModal}
	bind:this={openButton}
>
	{#each blok.open as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</button>

<div
	class="modal {open ? 'open' : ''}"
	aria-hidden={open === true}
	bind:this={modal}
>
	<div class="modal_backdrop" on:click={closeModal} use:editable={blok} />
	<div
		class="modal_content"
		role="dialog"
		aria-labelledby="b-{blok._uid}-label"
	>
		<div class="modal-label sr-only" id="b-{blok._uid}-label">
			{blok.accessible_label}
		</div>
		<button
			class="modal_close"
			aria-label="Close dialog"
			on:click={closeModal}
			bind:this={closeButton}
		>
			{#each blok.close as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		</button>
		{#each blok.content as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</div>
</div>

<style>
	.modal_open,
	.modal_close {
		padding: 0;
		border: none;
		background: none;
	}
	.modal,
	.modal_backdrop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.modal_backdrop {
		cursor: pointer;
		z-index: 50;
	}
	.modal {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		transition: opacity 0.25s;
		pointer-events: none;
	}
	.modal.open {
		opacity: 1;
		pointer-events: all;
	}
	.modal_content {
		position: relative;
		max-width: 90vw;
		z-index: 60;
	}
	.modal_close {
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 70;
	}
	:global(.modal_close .button) {
		overflow: visible !important;
	}
	.modal_open:focus:not(:focus-visible),
	.modal_close:focus:not(:focus-visible) {
		outline: auto;
	}
</style>
