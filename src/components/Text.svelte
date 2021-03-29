<script>
	import { onMount } from 'svelte'
	import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'
	import Resource from './Resource.svelte'
	import { afterUpdate } from 'svelte'
	import { editable } from './utils'

	export let blok
	let html, style
	let resolver = new RichTextResolver()

	function renderText() {
		html = resolver.render(blok.rich_text)
		if (html.includes('<pre><code')) {
			onMount(() => {
				function whenAvailable(name, callback) {
					window.setTimeout(function () {
						if (window[name]) {
							callback(window[name])
						} else {
							whenAvailable(name, callback)
						}
					}, 100)
				}
				whenAvailable('hljs', () => {
					document.querySelectorAll('pre code').forEach((block) => {
						hljs.highlightElement(block)
					})
				})
			})
		} else {
			html = html
				.replace('{c}', '©')
				.replace('{yyyy}', new Date().getFullYear())
				.replace(
					'{credit}',
					"<a class='credit' href='https://kaina.agency'>καιnὰ</a>"
				)
		}
		style = `text-align: ${blok.alignment}; --color: ${blok.color}`
	}

	renderText()
	afterUpdate(renderText)
</script>

<Resource
	js="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/highlight.min.js"
	css="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/atom-one-dark.min.css"
/>

<div use:editable={blok} class="text" {style}>
	{@html html}
</div>
