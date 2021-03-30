<script>
	import { colors, padding, rounded, shadow, editable } from './utils'
	import Link from './Link.svelte'
	export let blok

	function styles(b) {
		return colors(b) + padding(b, true) + rounded(b) + shadow(b) + b.style
	}
</script>

<Link
	{blok}
	classes="button colors {blok.class} {blok.icon && blok.text
		? 'pad-icon'
		: ''}"
	styles={styles(blok)}
>
	{@html blok.icon}
	{blok.text}
</Link>
