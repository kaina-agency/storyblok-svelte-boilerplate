<script>
	import { responsive, editable } from './utils'
	import getComponent from './index'
	export let blok
	let active = 0

	function setActive(n) {
		active = n
	}

	function setFocus(e) {
		if (e.key === 'ArrowRight') {
			if (e.target.nextElementSibling) e.target.nextElementSibling.focus()
		} else if (e.key === 'ArrowLeft') {
			if (e.target.previousElementSibling)
				e.target.previousElementSibling.focus()
		}
	}
</script>

<div
	class="tabs {blok.show_indicator ? 'indicator' : ''} {blok.class}"
	style={blok.style}
>
	<div
		role="tablist"
		style="text-align: {blok.alignment}; padding: 0 {blok.tab_padding *
			0.25}rem;"
	>
		{#each blok.tab_labels as blok, n}
			<button
				role="tab"
				aria-selected={active === n}
				aria-controls="panel-{n}"
				id="tab-{n}"
				on:click={() => {
					setActive(n)
				}}
				on:keydown={setFocus}
			>
				<svelte:component this={getComponent(blok.component)} {blok} />
			</button>
		{/each}
	</div>
	<div class="tab_content">
		{#each blok.content as blok, n}
			<div
				id="panel-{n}"
				role="tabpanel"
				aria-labelledby="tab-{n}"
				style="visiblity: {active === n ? 'visible' : 'hidden'}"
				hidden={active !== n}
			>
				<svelte:component this={getComponent(blok.component)} {blok} />
			</div>
		{/each}
	</div>
</div>

<style>
	button[role='tab'] {
		border: none;
		background: none;
		padding: 0;
	}
	:global(.indicator button[role='tab'][aria-selected='false'] > div.colors) {
		border: none;
		border-bottom: 2px solid transparent;
	}
	:global(.indicator button[role='tab'][aria-selected='true'] > div.colors) {
		border: none;
		border-bottom: 2px solid var(--hover_border_color);
		border-bottom-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
