<script>
	import { link, editable } from './utils'
	export let blok, classes, styles
</script>

{#if link(blok.action).href}
	<a
		href={link(blok.action).href}
		rel={link(blok.action).prefetch ? 'prefetch' : ''}
		aria-label={link(blok.action).aria}
		class={classes}
		style={styles}
		use:editable={blok}
	>
		<slot />
	</a>
{:else}
	<div class={classes} style={styles} use:editable={blok}>
		<slot />
	</div>
{/if}
