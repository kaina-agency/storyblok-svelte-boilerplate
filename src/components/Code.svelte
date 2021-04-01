<script>
	import { afterUpdate } from 'svelte'
	import { ratio, editable } from './utils'
	export let blok

	function runScripts() {
		if (blok.html.includes('<script')) {
			let el = document.querySelector('#b-' + blok._uid)
			let scriptTags = el.querySelectorAll(`script`)
			scriptTags.forEach((tag) => {
				let newTag = document.createElement('script')
				tag.src ? (newTag.src = tag.src) : (newTag.innerHTML = tag.innerHTML)
				tag.remove()
				document.head.appendChild(newTag)
			})
		}
	}

	afterUpdate(runScripts)
</script>

<div
	class="code {/[0-9]+\/+[0-9]/gm.test(blok.ratio) ? 'ratio-container' : ''}"
	style="padding-top: {ratio(blok.ratio)}"
	id="b-{blok._uid}"
	use:editable={blok}
>
	{@html blok.html.replace('iframe', "iframe loading='lazy'")}
</div>
