<script>
	import { link, editable } from './utils'
	export let blok, classes, styles

	function createRipple(event) {
		const el = event.currentTarget
		const circle = document.createElement('span')
		const diameter = Math.max(el.clientWidth, el.clientHeight)
		const radius = diameter / 2

		circle.style.width = circle.style.height = `${diameter}px`
		circle.style.left = `${event.clientX - el.offsetLeft - radius}px`
		circle.style.top = `${event.clientY - el.offsetTop - radius}px`
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
		class="{classes} Link"
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
		class="{classes} Link"
		style={styles}
		on:click={blok.ripple ? createRipple : undefined}
		use:editable={blok}
	>
		<slot />
	</div>
{/if}

<style>
	.Link {
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
