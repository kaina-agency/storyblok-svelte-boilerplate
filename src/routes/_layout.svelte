<script context="module">
	import client, { defaultRequestConfig as reqConfig } from '../storyblokClient'
	import Color from '../components/Color.svelte'
	import getComponent from '../components'

	export async function preload() {
		const response = await client.get('cdn/stories/global', reqConfig)
		return { story: response.data.story || {} }
	}
</script>

<script>
	export let story = {}
</script>

<svelte:head>
	<!-- Standard -->
	<title>{story.content.site_meta.title || story.name}</title>
	<meta name="title" content={story.content.site_meta.title || story.name} />
	<meta name="description" content={story.content.site_meta.description} />
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content={story.content.site_meta.title || story.name}
	/>
	<meta
		property="og:description"
		content={story.content.site_meta.description}
	/>
	<!-- Twitter -->
	<meta
		property="twitter:title"
		content={story.content.site_meta.title || story.name}
	/>
	<meta
		property="twitter:description"
		content={story.content.site_meta.description}
	/>
	<!-- Theme -->
	{#each ['primary', 'secondary', 'gray', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'] as color}
		<Color color={story.content[color]} colorName={color} />
	{/each}
</svelte:head>

{#each story.content.header as blok}
	<svelte:component this={getComponent(blok.component)} {blok} />
{/each}

{#each story.content.sidebar as blok}
	<svelte:component this={getComponent(blok.component)} {blok} />
{/each}

<main>
	<slot />
</main>

{#each story.content.footer as blok}
	<svelte:component this={getComponent(blok.component)} {blok} />
{/each}
