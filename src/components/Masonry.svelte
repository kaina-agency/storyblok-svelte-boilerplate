<script>
	import { onMount, beforeUpdate } from 'svelte'
	import { responsive, editable } from './utils'
	import Resource from './Resource.svelte'
	import getComponent from './index'
	export let blok

	let selector = `#b-${blok._uid} .grid-sizer, #b-${blok._uid} .grid-item`,
		rule = 'width: calc(100% / @);'

	function init() {
		let el = document.querySelector('#b-' + blok._uid)
		let options = {
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true,
		}
		let msnry = new Masonry(el, options)
		// watch for new items in editor
		new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				msnry.destroy()
				msnry = new Masonry(el, options)
			}
		}).observe(el, {
			childList: true,
		})
	}

	onMount(() => {
		function whenAvailable(name, callback) {
			window.setTimeout(function () {
				if (window[name]) {
					callback(window[name])
				} else {
					whenAvailable(name, callback)
				}
			}, 100)
		}
		whenAvailable('Masonry', init)
		window.dispatchEvent(new Event('resize'))
	})

	beforeUpdate(() => {
		window.dispatchEvent(new Event('resize'))
	})
</script>

<div class="masonry" use:editable={blok}>
	<div id="b-{blok._uid}" class="grid">
		<div class="grid-sizer" />
		{#each blok.content as blok}
			<div class="grid-item">
				<svelte:component this={getComponent(blok.component)} {blok} />
			</div>
		{/each}
	</div>
</div>

<Resource js="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js" />

<svelte:head>
	{@html `<tag>
		#b-${blok._uid} {
			margin: -${blok.gap * 2}px -${blok.gap * 2}px;
			margin-bottom: 0;
		}
		#b-${blok._uid} .grid-item > *{
			margin: ${blok.gap * 2}px;
		}
	</tag>`.replace(/tag/g, 'style')}
	{@html responsive(selector, rule, blok.responsive)}
</svelte:head>
