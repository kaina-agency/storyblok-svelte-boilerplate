<script>
	import { onMount } from 'svelte'
	import { responsive, editable } from './utils'
	import getComponent from './index'
	export let blok

	let slider
	let dots
	let paused = false

	function pause() {
		paused = true
	}
	function play() {
		paused = false
	}

	function prevSlide() {
		if (slider) {
			slider.scrollLeft === 0
				? (slider.scrollLeft = slider.scrollWidth)
				: (slider.scrollLeft -= slider.childNodes[0].offsetWidth)
		}
	}

	function nextSlide() {
		if (slider) {
			slider.scrollLeft + slider.offsetWidth + 5 >= slider.scrollWidth
				? (slider.scrollLeft = 0)
				: (slider.scrollLeft += slider.childNodes[0].offsetWidth)
		}
	}

	function autoplay() {
		if (paused) {
		} else {
			nextSlide()
		}
	}

	onMount(() => {
		if (blok.autoplay !== 'false') {
			setInterval(autoplay, Number(blok.autoplay))
		}

		slider.childNodes.forEach((el, n) => {
			let observer = new IntersectionObserver(
				(entry) => {
					entry[0].isIntersecting
						? (dots.childNodes[n].innerHTML =
								'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" /></svg>')
						: (dots.childNodes[n].innerHTML =
								'<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>')
				},
				{ root: slider, rootMargin: '50px', threshold: 1.0 }
			)
			observer.observe(el)
		})

		dots.childNodes.forEach((el) => {
			el.addEventListener('click', () => {
				let n = el.dataset.for
				slider.scrollTo({
					top: 0,
					left: slider.childNodes[n].offsetLeft,
					behavior: 'smooth',
				})
			})
		})
	})

	// styles

	let slides = `#b-${blok._uid} .slider__slide`,
		slideWidth = 'width: calc(100%/@);min-width: calc(100%/@);'

	function gap(b) {
		let gap = b.gap * 0.25 + 'rem'
		return `
		<tag>
				#b-${b._uid} {
					left: calc(-${gap || 0} / 2);
					width: calc(100% + ${gap || 0});
				}
				#b-${b._uid} .slider__slide > * {
					margin: 0 calc(${gap || 0}/2);
				}
		</tag>
		`.replace(/tag/g, 'style')
	}
</script>

<div
	class="slider__wrapper"
	on:mouseenter={pause}
	on:mouseleave={play}
	use:editable={blok}
>
	<div id="b-{blok._uid}" class="slider">
		<div class="slider__slides" bind:this={slider}>
			{#each blok.content as blok}
				<div class="slider__slide">
					<svelte:component this={getComponent(blok.component)} {blok} />
				</div>
			{/each}
		</div>
		<div class="slider__controls">
			<button class="slider__arrow" on:click={prevSlide}>
				{#each blok.back_button as blok}
					<svelte:component this={getComponent(blok.component)} {blok} />
				{/each}
			</button>
			<button class="slider__arrow" on:click={nextSlide}>
				{#each blok.forward_button as blok}
					<svelte:component this={getComponent(blok.component)} {blok} />
				{/each}
			</button>
		</div>
		<div class="slider__dots" style="color: {blok.dot_color}" bind:this={dots}>
			{#each blok.content as dots, n}
				<button data-for={n} />
			{/each}
		</div>
	</div>
</div>

<svelte:head>
	{@html responsive(slides, slideWidth, blok.slides_per_page)}
	{@html gap(blok)}
</svelte:head>
