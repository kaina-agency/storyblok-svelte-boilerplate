<script>
	import { afterUpdate } from 'svelte'
	import { editable } from '../directives'

	export let blok
	let map, locations, zoom, marker, size
	let base =
		'https://www.mapquestapi.com/staticmap/v5/map?key=oD74c3NX4siqviStfAxtHtYz2EwvGsVg'
	let ar = blok.ratio.split('/')[1] / blok.ratio.split('/')[0]

	afterUpdate(() => {
		let width = document.querySelector('.map').clientWidth,
			height = Math.round(width * ar),
			twox = window.devicePixelRatio > 1 ? '@2x' : ''
		size = '&size=' + `${width},${height + twox}`

		locations = '&locations=' + blok.locations.split('\n').join('||')
		ar = blok.ratio.split('/')[1] / blok.ratio.split('/')[0]
		zoom = '&zoom=' + blok.zoom_level
		marker = '&defaultMarker=' + blok.marker_style
		map = base + locations + size + zoom + marker
	})
</script>

<div class="map" use:editable={blok} style="padding-top: {ar * 100}%">
	<img src={map} alt="test" />
</div>

<style>
	.map {
		display: block;
		position: relative;
	}

	.map img {
		position: absolute;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
