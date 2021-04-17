<script>
	import { link, editable } from './utils'
	export let blok, classes, styles

	function createRipple(e) {
		let el = e.currentTarget
		let circle = document.createElement('span')
		let diameter = Math.max(el.clientWidth, el.clientHeight)
		let radius = diameter / 2
		let rect = el.getBoundingClientRect()

		circle.style.width = circle.style.height = `${diameter}px`
		circle.style.left = `${e.clientX - rect.left - radius}px`
		circle.style.top = `${e.clientY - rect.top - radius}px`
		circle.classList.add('ripple')

		const ripple = el.querySelector('.ripple')

		if (ripple) {
			ripple.remove()
		}

		el.appendChild(circle)
	}
</script>

{#if link(blok.action).href}
	<a
		class="{classes} Link {blok.ripple ? 'has-ripple' : ''}"
		style={styles}
		href={link(blok.action).href}
		aria-label={link(blok.action).aria}
		sapper:prefetch
		on:click={blok.ripple ? createRipple : undefined}
		use:editable={blok}
	>
		<slot />
	</a>
{:else}
	<div
		class="{classes} {blok.ripple ? 'has-ripple' : ''}"
		style={styles}
		on:click={blok.ripple ? createRipple : undefined}
		use:editable={blok}
	>
		<slot />
	</div>
{/if}

<style>
	.has-ripple {
		overflow: hidden;
	}
	:global(span.ripple) {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		animation: ripple 600ms linear;
		background-color: currentColor;
		opacity: 0.75;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
