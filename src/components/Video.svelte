<script>
	import { editable } from '../directives'
	export let blok
</script>

<video
	width="100%"
	autoplay={blok.auto_play}
	controls={!blok.hide_controls}
	controlslist="nodownload"
	loop={blok.loop}
	muted={blok.mute}
	playsinline={blok.play_inline}
	poster={blok.poster.filename}
	class={blok.class}
	style={blok.style}
	use:editable={blok}
>
	{#each blok.video_files as file}
		<source
			src={file.filename}
			type={`video/${
				file.filename.split('.')[file.filename.split('.').length - 1]
			}`}
		/>
	{/each}
</video>

<style>
	video {
		display: block;
		object-position: center;
		object-fit: cover;
	}
</style>
