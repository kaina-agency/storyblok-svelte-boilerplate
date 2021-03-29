<script>
	import { onMount, beforeUpdate } from 'svelte'
	import { editable } from './utils'
	import getComponent from './index'
	export let blok

	function init() {
		var bricklayer = new Bricklayer(document.querySelector('#b-' + blok._uid))
		beforeUpdate(() => {
			bricklayer.destroy()
			bricklayer = new Bricklayer(document.querySelector('#b-' + blok._uid))
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
		whenAvailable('Bricklayer', init)
	})
</script>

<div id="b-{blok._uid}" class="bricklayer" use:editable={blok}>
	{#each blok.content as blok}
		<div class="brick">
			<svelte:component this={getComponent(blok.component)} {blok} />
		</div>
	{/each}
</div>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/bricklayer/0.4.3/bricklayer.min.js"
		integrity="sha512-O0jpOJXcMwZlN9FUifHRs5HE596meicJh1zXTx9Yq+b3ymXoN8XhVLv+pS7AFQ2/sDXIk5CAScT78Sn1ZbL9uA=="
		crossorigin="anonymous"></script>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/bricklayer/0.4.3/bricklayer.min.css"
		integrity="sha512-qDxe1dF8Xm0oPdN3ZKjwLIHakEopjMqQ7Qmlv2M7ifllII7K/Y2BNxXbrI639pL9T6Fxg8vnDHIO6G8yrvL38w=="
		crossorigin="anonymous"
	/>
	{@html `<style>
		#b-${blok._uid}.bricklayer {
			margin: 0 -${.125 * blok.gap}rem;
		}
		#b-${blok._uid}.bricklayer .bricklayer-column {
			padding-left: ${.125 * blok.gap}rem;
			padding-right: ${.125 * blok.gap}rem;
		}
		#b-${blok._uid}.bricklayer .bricklayer-column .brick {
			margin-bottom: ${.25 * blok.gap}rem;
		}
	</style>`}
</svelte:head>
