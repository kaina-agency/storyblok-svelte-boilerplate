<script>
	import { link, colors, padding, rounded, shadow, editable } from './utils'
	export let blok

	function styles(b) {
		return colors(b) + padding(b, true) + rounded(b) + shadow(b) + b.style
	}
</script>

<a
	href={link(blok.action).href}
	aria-label={link(blok.action).aria}
	class="button colors {blok.class + blok.icon && blok.text ? 'pad-icon' : ''}"
	style={styles(blok)}
	use:editable={blok}
>
	{@html blok.icon}
	{blok.text}
</a>
