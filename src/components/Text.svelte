<script>
	import { afterUpdate } from 'svelte'
	import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'
	import Resource from './Resource.svelte'
	import { editable } from './utils'

	export let blok
	let resolver = new RichTextResolver()
	let debounce = require('lodash/debounce')
	let el

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
				.replace(/{dot-leader}/g, "<div class='dots'></div>")
				.replace(
					'{credit}',
					"<a class='credit' href='https://kaina.agency'>καιnὰ</a>"
				)
		}
		return { html: html, highlight: highlight }
	}

	afterUpdate(() => {
		el.querySelectorAll('p').forEach((p) => {
			if (p.innerText.includes('{dots}')) {
				p.innerHTML = p.innerHTML.replace('{dots}', "<div class='dots'></div>")
				p.classList.add('dot-leaders')
			}
		})
	})
</script>

{#if renderText(blok).highlight}
	<Resource
		js="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/highlight.min.js"
		css="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/atom-one-dark.min.css"
	/>
{/if}

<div
	use:editable={blok}
	class="text"
	style="color: {blok.color}; text-align:{blok.alignment}"
	bind:this={el}
>
	{@html renderText(blok).html}
</div>
