<script>
	import { onMount } from 'svelte'
	import { responsive, editable } from './utils'
	import getComponent from './index'
	export let blok

	let selector = `#b-${blok._uid} .grid-sizer, #b-${blok._uid} .grid-item`,
		rule = 'width: calc(100% / @);'

	function init() {
		let loaded = 0
		let el = document.querySelector('#b-' + blok._uid)
		let images = el.querySelectorAll('.grid-item img')
		images.forEach((image) => {
			image.addEventListener('load', () => {
				loaded++
				if (loaded === images.length) {
					let options = {
						itemSelector: '.grid-item',
						columnWidth: '.grid-sizer',
						percentPosition: true,
					}
					let msnry = new Masonry(el, options)
					window.dispatchEvent(new Event('resize'))
					// watch for new items in editor
					new MutationObserver((mutationsList) => {
						for (const mutation of mutationsList) {
							msnry.destroy()
							msnry = new Masonry(el, options)
							window.dispatchEvent(new Event('resize'))
						}
					}).observe(el, {
						childList: true,
					})
				}
			})
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

<svelte:head>
	<script
		src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
	{@html `<tag>
		#b-${blok._uid} {
			margin: -${blok.gap * 2}px -${blok.gap * 2}px;
			margin-bottom: 0;
		}
		.grid-item > *{
			margin: ${blok.gap * 2}px;
		}
	</tag>`.replace(/tag/g, 'style')}
	{@html responsive(selector, rule, blok.responsive)}
</svelte:head>
