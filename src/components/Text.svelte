<script>
	import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'
	import { editable } from '../directives'

	export let blok
	let resolver = new RichTextResolver()
</script>

<div use:editable={blok}>{@html resolver.render(blok.rich_text)}</div>
