<script>
	import { onMount } from 'svelte'
	import { editable } from './utils'
	import getComponent from './index'
	export let blok

	let next

	onMount(() => {
		next = blok.success_page.url
			? blok.success_page.url
			: `${window.location.origin}/${blok.success_page.cached_url}`
	})
</script>

<form
	action="https://formsubmit.co/{blok.notification_email}"
	method="POST"
	enctype="multipart/form-data"
	style="--color-default: {blok.input_color};"
	use:editable={blok}
>
	{#if blok.name}
		<input type="hidden" name="_subject" value={blok.name} />
	{/if}
	<input type="hidden" name="_next" value={next} />
	<input type="hidden" name="_template" value="box" />
	<input type="text" name="_honey" style="display: none" />
	{#each blok.content as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}
	<button type="submit" aria-label="Submit form">
		{#each blok.submit_button as blok}
			<svelte:component this={getComponent(blok.component)} {blok} />
		{/each}
	</button>
</form>
