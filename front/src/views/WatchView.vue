<script>

import ControlBar from '../components/ControlBar.vue';

export default {
	name: "WatchView",
	components:
	{
		ControlBar
	},
	data()
	{
		return {
			film:
			{
				src: "/films/video.mp4",
				audios: ["Français", "English", "Deutsch"],
				subtitles: ["English", "Français", "Spanish", "Arab", "Deutsch"]
			}
		}
	}
}
</script>

<template>
	<div class="watch_view">
		<div class="back_button">
			<svg viewBox="0 0 24 24">
				<path d="M6.357 11H21v2H6.357l4.585 5.35-1.518 1.3L2.866 12l6.558-7.65 1.518 1.3L6.357 11z" fill="currentColor"></path>
			</svg>
		</div>
		<ControlBar :audios="film.audios" :subtitles="film.subtitles"/>
	</div>
</template>

<style scoped>

.watch_view
{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	color: white;
	background: black;
}

.back_button
{
	position: fixed;
	top: 1rem;
	left: 1rem;
}

.back_button
{
	width: 2rem;
	height: 2rem;
	cursor: pointer;
}

</style>