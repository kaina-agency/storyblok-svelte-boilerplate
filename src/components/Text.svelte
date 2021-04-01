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
				hljs.highlightAll(block)
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
		if (html.includes('{dots}')) {
			afterUpdate(() => {
				el.querySelectorAll('p').forEach((p) => {
					if (p.innerText.includes('{dots}')) {
						p.innerHTML = p.innerHTML.replace(
							'{dots}',
							"<div class='dots'></div>"
						)
						p.classList.add('dot-leaders')
					}
				})
			})
		}
		return { html: html, highlight: highlight }
	}
</script>

<div
	class="text {blok.class}"
	style="color: {blok.color}; text-align:{blok.alignment}; {blok.style}"
	bind:this={el}
	use:editable={blok}
>
	{@html renderText(blok).html}
</div>

{#if renderText(blok).highlight}
	<Resource
		js="//unpkg.com/@highlightjs/cdn-assets@10.7.1/highlight.min.js"
		css="//unpkg.com/@highlightjs/cdn-assets@10.7.1/styles/atom-one-dark.min.css"
	/>
{/if}
