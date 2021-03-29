<script>
	import { onMount } from 'svelte'
	export let run
	export let js
	export let css

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

		function whenAvailable(name, callback) {
			window.setTimeout(function () {
				if (window[name]) {
					callback(window[name])
				} else {
					whenAvailable(name, callback)
				}
			}, 100)
		}
		whenAvailable('Bricklayer', run)
	})
</script>
