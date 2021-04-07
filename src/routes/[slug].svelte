<script context="module">
	import client, { defaultRequestConfig as reqConfig } from '../storyblokClient'
	import Meta from '../components/Meta.svelte'
	import getComponent from '../components'

	export async function preload(page) {
		const { slug } = page.params
		const response = await client.get('cdn/stories/' + slug, reqConfig)
		return { story: response.data.story || {} }
	}
</script>

<script>
	export let story = {}
</script>

<Meta title={story.name} />

{#if story.content.component}
	<svelte:component
		this={getComponent(story.content.component)}
		blok={story.content}
	/>
{/if}
