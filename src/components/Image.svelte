<script>
	import { onMount } from 'svelte'
	import { editable } from './utils'
	let debounce = require('lodash/debounce')

	export let blok
	let el
	let width = 0

	function style(b) {
		let filters = `filter: brightness(${b.brightness}) contrast(${b.contrast}) saturate(${b.saturation});`
		let ratio
		if (/[0-9]+\/+[0-9]/gm.test(b.aspect_ratio)) {
			ratio = blok.aspect_ratio.split('/')[1] / blok.aspect_ratio.split('/')[0]
			ratio = (ratio * 100).toFixed(2)
		}
		let padding = ratio ? `padding-top: ${ratio}%;` : ''

		return filters + padding + b.style
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

	function setWidth() {
		let perfectWidth =
			Math.round((el.clientWidth * devicePixelRatio) / 100) * 100
		if (perfectWidth !== 0 && perfectWidth > width) {
			width = perfectWidth
		} else {
			width = blok.width || 600
		}
	}

	onMount(setWidth)
</script>

<div
	class="image {blok.class}"
	style="{style(blok)} {blok.width > 0 ? `width: ${blok.width}px` : ''}"
	bind:this={el}
>
	{#if width > 0}
		<img
			src={src(blok, width)}
			alt=""
			loading="lazy"
			height="auto"
			width={blok.width ? blok.width + 'px' : '100%'}
			use:editable={blok}
		/>
	{/if}
</div>

<svelte:window on:resize={debounce(setWidth, 500)} />

<style>
	.image {
		position: relative;
	}
	.image[style*='padding-top'] img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
