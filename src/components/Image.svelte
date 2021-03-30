<script>
	import { onMount } from 'svelte'
	import { editable } from './utils'
	let debounce = require('lodash/debounce')

	export let blok
	let el
	let width = 0

	function setWidth() {
		let newWidth = Math.round((el.clientWidth * devicePixelRatio) / 100) * 100
		if (newWidth > width) {
			width = newWidth
		}
	}

	function filters(b) {
		return `filter: brightness(${b.brightness}) contrast(${b.contrast}) saturate(${b.saturation}); ${b.style}`
	}

	function src(b, w) {
		let image = String(b.image.filename).split('https://a.storyblok.com')[1]
		let fit = b.fit === 'contain' ? 'fit-in/' : ''
		let ar = blok.aspect_ratio.split('/')[1] / blok.aspect_ratio.split('/')[0]
		let height = /[0-9]+\/[0-9]+/gm.test(b.aspect_ratio)
			? Math.round(w * ar)
			: ''
		let smart = b.fit === 'smart' && !b.image.focus ? 'smart/' : ''
		let grayscale = b.grayscale ? ':grayscale()' : ''
		if (w && b.image.filename && b.image.filename.endsWith('.svg')) {
			return b.image.filename
		} else if (w && b.image.filename) {
			return `https://img2.storyblok.com/${fit}${w}x${height}/${smart}filters:format(webp):fill(transparent):quality(${b.quality}):focal(${b.image.focus})${grayscale}${image}`
		} else if (w) {
			return `https://picsum.photos/seed/{${b._uid}}picsum/${w}/${height}.webp`
		}
	}

	onMount(setWidth)
</script>

<div
	class="image {blok.class}"
	style="{filters(blok)} {blok.width > 0 ? `width: ${blok.width}px` : ''}"
	bind:this={el}
>
	{#if width > 0}
		<img
			src={src(blok, width)}
			alt=""
			loading="lazy"
			width={blok.width || '100%'}
			use:editable={blok}
		/>
	{/if}
</div>

<svelte:window on:resize={debounce(setWidth, 500)} />
