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
				name: 'Guilty',
				src: "/films/0/video.mp4",
				duration: 170.859,
				audios:
				[
					{
						id: 0,
						value: "Français"
					},
					{
						id: 1,
						value: "English"
					},
					{
						id: 2,
						value: "Deutsch"
					}
				],
				subtitles:
				[
					{
						id: 0,
						value: "English"
					},
					{
						id: 1,
						value: "Français"
					},
					{
						id: 2,
						value: "Spanish"
					},
					{
						id: 3,
						value: "Arab"
					},
					{
						id: 4,
						value: "Deutsch"
					}
				],
			},
			currentTime: 0,
			is_playing: false
		}
	},
	methods:
	{
		play()
		{
			this.$refs.video.play();
			this.is_playing = !this.$refs.video.paused;
		},
		pause()
		{
			this.$refs.video.pause();
			this.is_playing = !this.$refs.video.paused;
		},
		unmute()
		{
			this.$refs.video.muted = false;
		},
		mute()
		{
			this.$refs.video.muted = true;
		},
		setVolume(value)
		{
			this.$refs.video.volume = value;
		},
		setAudio()
		{

		},
		seSubtitle()
		{

		},
		setSpeed(speed)
		{
			this.$refs.video.playbackRate = speed;
		},
		setCurrentTime(value)
		{
			this.$refs.video.currentTime = value;
		},
		setFullscreen()
		{
			let elem = this.$refs.watch_view;
			if (elem.requestFullscreen)
				elem.requestFullscreen();
			else if (elem.webkitRequestFullscreen) // Safari
				elem.webkitRequestFullscreen();
		},
		exitFullscreen()
		{
			document.exitFullscreen();
		},
		goBack()
		{
			this.handleBack('/browse');
		},
		pause_play()
		{
			if (this.$refs.video.paused)
				this.play()
			else
				this.pause();
		}
	},
	created()
	{
		window.setInterval(() =>
		{
			if (this.$refs.video)
				this.currentTime = this.$refs.video.currentTime;
		}, 10);
	}
}
</script>

<template>
	<div class="watch_view" ref="watch_view">
		<div class="back_button" @click="goBack">
			<svg viewBox="0 0 24 24">
				<path d="M6.357 11H21v2H6.357l4.585 5.35-1.518 1.3L2.866 12l6.558-7.65 1.518 1.3L6.357 11z" fill="currentColor"></path>
			</svg>
		</div>
		<div class="video_container" @click="pause_play">
			<video ref="video">
				<source :src="film.src" type="video/mp4">
			</video>
		</div>
		<ControlBar :audios="film.audios" :subtitles="film.subtitles" :duration="film.duration" :currentTime="currentTime" :film_name="film.name" :playing="is_playing"
			@play="play"
			@pause="pause"
			@enable_volume="unmute"
			@disable_volume="mute"
			@volume_changed="setVolume"
			@speed_changed="setSpeed"
			@time_changed="setCurrentTime"
			@enable_fullscreen="setFullscreen"
			@exit_fullscreen="exitFullscreen"
		/>
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
	width: 2rem;
	height: 2rem;
	cursor: pointer;
	z-index: 1;
}

.video_container
{
	width: 100%;
	height: 100%;
}

video
{
	width: 100%;
	height: 100%;
}

</style>