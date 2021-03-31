<script>
	import { onMount } from 'svelte'
	export let js = undefined
	export let css = undefined

	onMount(() => {
		if (js) {
			let script = document.createElement('script')
			script.src = js
			document.head.appendChild(script)
		}
		if (css) {
			let link = document.createElement('link')
			link.href = css
			link.rel = 'stylesheet'
			document.head.appendChild(link)
		}
	})
</script>
