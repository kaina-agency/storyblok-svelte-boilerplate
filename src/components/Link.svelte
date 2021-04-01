<script>
	import { link, editable } from './utils'
	export let blok, classes, styles
</script>

{#if link(blok.action).href}
	<a
		class={classes}
		style={styles}
		href={link(blok.action).href}
		aria-label={link(blok.action).aria}
		rel={link(blok.action).prefetch ? 'prefetch' : ''}
		use:editable={blok}
	>
		<slot />
	</a>
{:else}
	<div class={classes} style={styles} use:editable={blok}>
		<slot />
	</div>
{/if}
