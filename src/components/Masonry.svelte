<script>
	import Masonry from 'svelte-masonry/Masonry.svelte'
	import getComponent from './index'
	import { editable } from './utils'
	export let blok
</script>

<div class="masonry" use:editable={blok}>
	<Masonry gridGap="{0.25 * blok.gap}rem" items={blok.content}>
		{#each blok.content as blok}
			<div>
				<svelte:component this={getComponent(blok.component)} {blok} />
			</div>
		{/each}
	</Masonry>
</div>
