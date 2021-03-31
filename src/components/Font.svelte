<script>
	import { afterUpdate } from 'svelte'
	export let blok

	function css(b) {
		let custom_class
		if (b.custom_class) {
			custom_class = `.${b.custom_class}, .${b.custom_class} *`
		}
		return `
		<tag>
			${custom_class || b.apply_to} {
				font-family: ${b.font_family};
				font-weight: ${b.font_weight};
			}
		</tag>
		`.replace(/tag/g, 'style')
	}

	function loadFont() {
		const WebFont = require('webfontloader')
		if (blok.adobe_fonts_project) {
			WebFont.load({
				typekit: { id: blok.adobe_fonts_project },
			})
		} else {
			WebFont.load({
				google: {
					families: [
						blok.font_family + ':' + blok.font_weight + '&display=swap',
					],
				},
			})
		}
	}

	afterUpdate(loadFont)
</script>

<svelte:head>
	{@html css(blok)}
</svelte:head>
