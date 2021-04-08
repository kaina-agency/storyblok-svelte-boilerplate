<script>
	import { onMount } from 'svelte'
	import getComponent from './index'
	export let blok
	let el
	let open = false

	function openModal() {
		open = true
		el.querySelector('.modal_close').focus()
	}

	function closeModal() {
		open = false
	}

	onMount(() => {
		document.body.appendChild(el)
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

<button class="modal_open" on:click={openModal}>
	{#each blok.open as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
</button>

<div
	class="modal {open ? 'open' : 'closed'}"
	aria-hidden={open === true}
	bind:this={el}
>
	<div class="modal_backdrop" on:click={closeModal} />
	<div class="modal_content">
		<button class="modal_close" on:click={closeModal}>
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
		z-index: 40;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.modal_backdrop {
		cursor: pointer;
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
		z-index: 50;
	}
	:global(.modal_close .button) {
		overflow: visible !important;
	}
	.modal_close:focus:not(:focus-visible) {
		outline: auto;
	}
</style>
