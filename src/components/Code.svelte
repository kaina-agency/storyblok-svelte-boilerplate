<script>
	import { afterUpdate } from 'svelte'
	import { editable } from './utils'
	export let blok

	function ratio(r) {
		if (r.includes('/')) return (r.split('/')[1] / r.split('/')[0]) * 100 + '%'
	}

	function run() {
		if (blok.html.includes('<script')) {
			let el = document.querySelector('#' + blok._uid)
			let scriptTags = el.querySelectorAll(`script`)
			scriptTags.forEach((tag) => {
				let newTag = document.createElement('script')
				tag.src ? (newTag.src = tag.src) : (newTag.type = 'module')
				newTag.innerHTML = tag.innerHTML
				tag.remove()
				document.head.appendChild(newTag)
			})
		}
	}

	afterUpdate(run)
</script>

<div
	id={blok._uid}
	class={blok.ratio.includes('/') ? 'ratio-container' : ''}
	style="padding-top: {ratio(blok.ratio)}"
	use:editable={blok}
>
	{@html blok.html.replace('iframe', "iframe loading='lazy'")}
</div>
