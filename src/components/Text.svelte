<script>
	import { afterUpdate } from 'svelte'
	import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'
	import Resource from './Resource.svelte'
	import { editable } from './utils'

	export let blok
	let resolver = new RichTextResolver()
	let debounce = require('lodash/debounce')

	function highlightText() {
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
	}

	function renderText(b) {
		let html = resolver.render(b.rich_text)
		let highlight = false
		if (html.includes('<pre><code')) {
			highlight = true
			afterUpdate(debounce(highlightText, 500))
		} else {
			html = html
				.replace('{c}', '©')
				.replace('{yyyy}', new Date().getFullYear())
				.replace(
					'{credit}',
					"<a class='credit' href='https://kaina.agency'>καιnὰ</a>"
				)
		}
		return { html: html, highlight: highlight }
	}
</script>

{#if renderText(blok).highlight}
	<Resource
		js="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/highlight.min.js"
		css="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/atom-one-dark.min.css"
	/>
{/if}

<div use:editable={blok} class="text">
	{@html renderText(blok).html}
</div>
