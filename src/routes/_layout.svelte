<script context="module">
	import { onMount } from 'svelte'
	import { lock, unlock } from 'tua-body-scroll-lock'
	import client, { defaultRequestConfig as reqConfig } from '../storyblokClient'
	import Color from '../components/Color.svelte'
	import Meta from '../components/Meta.svelte'
	import getComponent from '../components'

	export async function preload(page, session) {
		let lang = ''
		if (page.path.startsWith('/es/')) lang = 'es/'
		if (page.path.startsWith('/fr/')) lang = 'fr/'
		const response = await client.get(`cdn/stories/${lang}global`, reqConfig)
		return { story: response.data.story || {} }
	}
</script>

<script>
	export let story = {}
	let sidebarActive = false

	onMount(() => {
		let sidebar = document.querySelector('.sidebar')
		let sidebarButton = document.querySelector('.sidebar-button')
		let sidebarBackdrop = document.querySelector('.sidebar-backdrop')

		function toggleSidebar() {
			if (sidebarActive) {
				sidebar.classList.remove('active')
				sidebarBackdrop.classList.remove('active')
				unlock(sidebar)
			} else {
				sidebar.classList.add('active')
				sidebarBackdrop.classList.add('active')
				lock(sidebar)
			}
			sidebarActive = !sidebarActive
		}

		sidebarButton.addEventListener('click', toggleSidebar)
		sidebarBackdrop.addEventListener('click', toggleSidebar)

		let breakpoint = story.content.layout.includes('show-sidebar-on-desktop')
			? 1024
			: 768
		let mq = matchMedia(`(min-width: ${breakpoint}px)`)

		mq.addEventListener('change', () => {
			if (mq.matches) {
				sidebar.classList.remove('active')
				sidebarBackdrop.classList.remove('active')
				sidebarActive = false
				unlock(sidebar)
			}
		})
		sidebar.querySelectorAll('[aria-label*=page]').forEach((el) => {
			el.addEventListener('click', () => {
				sidebar.classList.remove('active')
				sidebarBackdrop.classList.remove('active')
				sidebarActive = false
				unlock(sidebar)
			})
		})

		let links = document.querySelectorAll('.Link')
		function highlightActive() {
			links.forEach((link) => {
				if (link.href === window.location.href) {
					link.classList.add('active')
				} else link.classList.remove('active')
			})
		}
		highlightActive()
		window.addEventListener('click', highlightActive)
	})
</script>

<Meta meta={story.content.site_meta} />

<svelte:head>
	{#if story.content.favicon.filename.endsWith('svg')}
		<link
			rel="icon"
			href={story.content.favicon.filename}
			type="image/svg+xml"
		/>
	{:else if story.content.favicon.filename}
		<link
			rel="icon"
			href={story.content.favicon.filename.replace(
				'https://a.storyblok.com',
				'https://img2.storyblok.com/fit-in/32x32/filters:format(png):quality(50)'
			)}
		/>
	{/if}
	{#if story.content.apple_touch_icon.filename}
		<link
			rel="apple-touch-icon"
			href={story.content.apple_touch_icon.filename}
		/>
	{/if}
	{#each ['primary', 'secondary', 'gray', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'] as color}
		<Color color={story.content[color]} colorName={color} />
	{/each}
</svelte:head>

<div class="layout {story.content.layout}">
	{#if story.content.header.length}
		{#if story.content.layout.includes('show-sidebar-on-desktop')}
			<div class="header-container">
				{#each story.content.header as blok}
					<svelte:component this={getComponent(blok.component)} {blok} />
				{/each}
			</div>
		{:else}
			{#each story.content.header as blok}
				<svelte:component this={getComponent(blok.component)} {blok} />
			{/each}
		{/if}
	{/if}

	<div class="sidebar-backdrop" />

	{#each story.content.sidebar as blok}
		<svelte:component this={getComponent(blok.component)} {blok} />
	{/each}

	<main class="content">
		<slot />
		{#if story.content.footer.length}
			<footer class="footer">
				{#each story.content.footer as blok}
					<svelte:component this={getComponent(blok.component)} {blok} />
				{/each}
			</footer>
		{/if}
	</main>
</div>
