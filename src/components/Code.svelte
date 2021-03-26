<script>
	import { afterUpdate } from 'svelte'
	import { editable } from './utils'
	export let blok

	function ratio(r) {
		if (r.includes('/')) return (r.split('/')[1] / r.split('/')[0]) * 100 + '%'
	}

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
	id="b-{blok._uid}"
	class={blok.ratio.includes('/') ? 'ratio-container' : ''}
	style="padding-top: {ratio(blok.ratio)}"
	use:editable={blok}
>
	{@html blok.html.replace('iframe', "iframe loading='lazy'")}
</div>

<style>
	.ratio-container {
		position: relative;
	}

	.ratio-container > * {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
