<script>
	import { colors, padding, rounded, shadow } from './utils'
	import Link from './Link.svelte'
	export let blok
	$: hidden = blok.hide_text ? 'sr-only' : ''

	function side(b) {
		if (b.icon) {
			return b.icon_on_right ? 'right' : 'left'
		}
	}

	function styles(b) {
		let wide = b.hide_text ? false : true
		return colors(b) + padding(b, wide) + rounded(b) + shadow(b) + b.style
	}
</script>

<Link
	classes="button colors {side(blok)} {blok.class}"
	styles={styles(blok)}
	{blok}
>
	<span aria-hidden="true">{@html blok.icon}</span>
	<span class="button-text {hidden}">{blok.text}</span>
</Link>
