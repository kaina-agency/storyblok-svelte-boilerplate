<script>
	import { onMount, afterUpdate } from 'svelte'
	import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'
	import Resource from './Resource.svelte'
	import { editable } from './utils'
	export let blok
	let resolver = new RichTextResolver()

	function init() {
		var typed = new Typed('.typer', {
			typeSpeed: 70,
			stringsElement: '#typed-strings',
			backDelay: 2000,
			loop: true,
		})
	}

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
		whenAvailable('Typed', init)
	})
</script>

<Resource js="https://cdn.jsdelivr.net/npm/typed.js@2.0.12" />

<div use:editable={blok} class={blok.class} style={blok.style}>
	{@html `<${blok.tag}><span class="typer"></span><${blok.tag}>`}
	<div id="typed-strings">
		{@html resolver.render(blok.text)}
	</div>
</div>
