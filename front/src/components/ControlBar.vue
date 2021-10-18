<script>


/**
 * Events:
 *   - play
 *   - pause
 *   - enable_volume
 *   - disable_volume
 *   - volume_changed
 *   - audio_changed
 *   - subtitle_disabled
 *   - subtitle_changed
 *   - speed_changed
 *   - time_changed
 *   - enable_fullscreen
 *   - disable_fullscreen
 */

export default {
	name: "ControlBar",
	props: ["audios", "subtitles", "duration", "currentTime", "film_name", "playing"],
	data()
	{
		return {
			speed: 1.0,
			audio: this.audios[0],
			subtitle: null,
			show_volume_popup: false,
			show_audio_popup: false,
			show_speed_popup: false,
			start_move_volume_y: null,
			volume_value: 100,
			start_move_time_x: null,
			current_time_value: this.currentTime,
			is_playing: this.playing,
			volume_enabled: true,
			is_fullscreen: false,
			time_remaining: this.duration
		}
	},
	methods:
	{
		play()
		{
			this.is_playing = true;
			this.$emit('play');
		},
		pause()
		{
			this.is_playing = false;
			this.$emit('pause');
		},
		back_10()
		{
			this.$emit('back_10');
			// this.current_time_value = this.current_time_value > 10 ? this.current_time_value - 10 : 0;
			// this.$emit('time_changed', this.current_time_value);
		},
		forward_10()
		{
			this.$emit('forward_10');
			// this.current_time_value = this.current_time_value < this.duration - 10 ? this.current_time_value + 10 : this.duration;
			// this.$emit('time_changed', this.current_time_value);
		},
		switchAudio(audio)
		{
			this.audio = audio;
			this.$emit("audio_changed", audio);
		},
		disableSubtitle()
		{
			this.subtitle = null;
			this.$emit("subtitle_disabled");
		},
		switchSubtitle(subtitle)
		{
			this.subtitle = subtitle;
			this.$emit("subtitle_changed", subtitle);
		},
		showPopup(name)
		{
			if (name == "volume")
				this.show_volume_popup = true;
			else if (name == "audio")
				this.show_audio_popup = true;
			else if (name == "speed")
				this.show_speed_popup = true;
		},
		hidePopup()
		{
			this.show_volume_popup = false;
			this.show_audio_popup = false;
			this.show_speed_popup = false;
		},
		setSpeed(speed)
		{
			this.speed = speed;
			this.$emit('speed_changed', speed);
		},
		startMoveVolumeCursor(e)
		{
			this.start_move_volume_y = e.clientY;
			this.$refs.volume_bar.addEventListener('mousemove', this.moveVolumeCursor);
		},
		moveVolumeCursor(e)
		{
			let height = this.$refs.volume_bar.getBoundingClientRect().height;
			let diff = this.start_move_volume_y - e.clientY;
			let diff_percent = diff * 100 / height;
			this.volume_value += diff_percent;
			if (this.volume_value < 0)
				this.volume_value = 0;
			else if (this.volume_value > 100)
				this.volume_value = 100;
			else								// Update the start_move_y only in this case. Else error
			{
				this.start_move_volume_y = e.clientY;
				this.$emit('volume_changed', this.volume_value / 100);
			}
			e.stopPropagation();
		},
		setVolumeEnabled(on)
		{
			this.volume_enabled = on;
			if (this.volume_enabled)
				this.$emit('enable_volume');
			else
				this.$emit('disable_volume');
		},
		endMoveVolumeCursor(e)
		{
			this.$refs.volume_bar.removeEventListener('mousemove', this.moveVolumeCursor);
		},

		startMoveTimeCursor(e)
		{
			this.start_move_time_x = e.clientX;
			this.$refs.time_bar.addEventListener('mousemove', this.moveTimeCursor);
		},
		moveTimeCursor(e)
		{
			let width = this.$refs.time_bar.getBoundingClientRect().width;
			let diff = this.start_move_time_x - e.clientX;
			let diff_percent = diff * 100 / width;
			this.current_time_value -= this.percentToCurrentTime(diff_percent);
			if (this.current_time_value < 0)
				this.current_time_value = 0;
			else if (this.current_time_value > this.duration)
				this.current_time_value = this.duration;
			else								// Update the start_time_x only in this case. Else error
			{
				this.start_move_time_x = e.clientX;
				this.$emit("time_changed", this.current_time_value);
			}
		},
		endMoveTimeCursor(e)
		{
			this.$refs.time_bar.removeEventListener('mousemove', this.moveTimeCursor);
		},
		setFullscreen(on)
		{
			this.is_fullscreen = on;
			if (on)
				this.$emit('enable_fullscreen');
			else
				this.$emit('exit_fullscreen');
		},
		currentTimeToPercent()
		{
			return this.current_time_value * 100 / this.duration;
		},
		percentToCurrentTime(percent)
		{
			return percent * this.duration / 100;
		}
	},
	computed:
	{
		formatted_remaining_time()
		{
			let remaining = this.duration - this.current_time_value;
			let hours = parseInt(remaining / 3600);
			let minutes = parseInt((remaining - hours * 3600) / 60);
			let seconds = parseInt(remaining - hours*3600 - minutes*60);
			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			return hours + ':' + minutes + ':' + seconds;
		}
	},
	updated()
	{
		this.current_time_value = this.currentTime;
		this.is_playing = this.playing;
	}
}
</script>

<template>
	<div class="control_bar">
		<div class="timeline_bar" @mouseup="endMoveTimeCursor">
			<div class="bar" ref="time_bar" @click="moveTimeCursor">
				<div class="progress" :style="{width: currentTimeToPercent() + '%'}"></div>
				<div class="cursor" :style="{left: currentTimeToPercent() + '%'}" @mousedown="startMoveTimeCursor"></div>
			</div>
			<p class="remaining_time">{{ formatted_remaining_time }}</p>
		</div>
		<div class="control_container">
			<div class="control_buttons_container">
				<div class="button" id="play_button" v-if="!is_playing" @click="play">
					<svg viewBox="0 0 24 24">
						<polygon fill="currentColor" points="6 4 21 12 6 20"></polygon>
					</svg>
				</div>
				<div class="button" id="pause_button" v-else @click="pause">
					<svg viewBox="0 0 24 24">
						<path fill="currentColor" d="M5,3 L10,3 L10,21 L5,21 L5,3 Z M14,3 L19,3 L19,21 L14,21 L14,3 Z"></path>
					</svg>
				</div>
				<div class="button" id="back_10" @click="back_10">
					<svg viewBox="0 0 24 24">
						<path fill="currentColor" d="M12.4521632,5.01256342 L13.8137335,6.91876181 L12.1862665,8.08123819 L9.27109639,4 L12.1862665,-0.0812381937 L13.8137335,1.08123819 L12.4365066,3.0093558 C17.7568368,3.23786247 22,7.6234093 22,13 C22,18.5228475 17.5228475,23 12,23 C6.4771525,23 2,18.5228475 2,13 C2,11.0297737 2.57187523,9.14190637 3.62872363,7.52804389 L5.30188812,8.6237266 C4.4566948,9.91438076 4,11.4220159 4,13 C4,17.418278 7.581722,21 12,21 C16.418278,21 20,17.418278 20,13 C20,8.73346691 16.6600802,5.24701388 12.4521632,5.01256342 Z M8.47,17 L8.47,11.41 L6.81,11.92 L6.81,10.75 L9.79,9.91 L9.79,17 L8.47,17 Z M14.31,17.15 C13.7499972,17.15 13.2600021,17.0016682 12.84,16.705 C12.4199979,16.4083319 12.0950011,15.9883361 11.865,15.445 C11.6349988,14.901664 11.52,14.2600037 11.52,13.52 C11.52,12.786663 11.6349988,12.1466694 11.865,11.6 C12.0950011,11.0533306 12.4199979,10.6316682 12.84,10.335 C13.2600021,10.0383319 13.7499972,9.89 14.31,9.89 C14.8700028,9.89 15.3599979,10.0383319 15.78,10.335 C16.2000021,10.6316682 16.5249988,11.0533306 16.755,11.6 C16.9850012,12.1466694 17.1,12.786663 17.1,13.52 C17.1,14.2600037 16.9850012,14.901664 16.755,15.445 C16.5249988,15.9883361 16.2000021,16.4083319 15.78,16.705 C15.3599979,17.0016682 14.8700028,17.15 14.31,17.15 Z M14.31,15.97 C14.7500022,15.97 15.1016653,15.7533355 15.365,15.32 C15.6283346,14.8866645 15.76,14.2866705 15.76,13.52 C15.76,12.7533295 15.6283346,12.1533355 15.365,11.72 C15.1016653,11.2866645 14.7500022,11.07 14.31,11.07 C13.8699978,11.07 13.5183346,11.2866645 13.255,11.72 C12.9916653,12.1533355 12.86,12.7533295 12.86,13.52 C12.86,14.2866705 12.9916653,14.8866645 13.255,15.32 C13.5183346,15.7533355 13.8699978,15.97 14.31,15.97 Z M7.72890361,4 L9.81373347,6.91876181 L8.18626653,8.08123819 L5.27109639,4 L8.18626653,-0.0812381937 L9.81373347,1.08123819 L7.72890361,4 Z"></path>
					</svg>
				</div>
				<div class="button" id="forward_10" @click="forward_10">
					<svg viewBox="0 0 24 24">
						<path fill="currentColor" d="M11.8291288,3.00143042 L10.4575629,1.08123819 L12.0850299,-0.0812381937 L15.0002,4 L12.0850299,8.08123819 L10.4575629,6.91876181 L11.8267943,5.0018379 C7.48849327,5.09398699 4,8.63960287 4,13 C4,17.418278 7.581722,21 12,21 C16.418278,21 20,17.418278 20,13 C20,11.4220159 19.5433052,9.91438076 18.6981119,8.6237266 L20.3712764,7.52804389 C21.4281248,9.14190637 22,11.0297737 22,13 C22,18.5228475 17.5228475,23 12,23 C6.4771525,23 2,18.5228475 2,13 C2,7.53422249 6.38510184,3.09264039 11.8291288,3.00143042 Z M8.56,17 L8.56,11.41 L6.9,11.92 L6.9,10.75 L9.88,9.91 L9.88,17 L8.56,17 Z M14.4,17.15 C13.8399972,17.15 13.3500021,17.0016682 12.93,16.705 C12.5099979,16.4083318 12.1850012,15.988336 11.955,15.445 C11.7249989,14.9016639 11.61,14.2600037 11.61,13.52 C11.61,12.786663 11.7249989,12.1466694 11.955,11.6 C12.1850012,11.0533306 12.5099979,10.6316681 12.93,10.335 C13.3500021,10.0383318 13.8399972,9.89 14.4,9.89 C14.9600028,9.89 15.4499979,10.0383318 15.87,10.335 C16.2900021,10.6316681 16.6149988,11.0533306 16.845,11.6 C17.0750012,12.1466694 17.19,12.786663 17.19,13.52 C17.19,14.2600037 17.0750012,14.9016639 16.845,15.445 C16.6149988,15.988336 16.2900021,16.4083318 15.87,16.705 C15.4499979,17.0016682 14.9600028,17.15 14.4,17.15 Z M14.4,15.97 C14.8400022,15.97 15.1916654,15.7533355 15.455,15.32 C15.7183347,14.8866645 15.85,14.2866705 15.85,13.52 C15.85,12.7533295 15.7183347,12.1533355 15.455,11.72 C15.1916654,11.2866645 14.8400022,11.07 14.4,11.07 C13.9599978,11.07 13.6083346,11.2866645 13.345,11.72 C13.0816654,12.1533355 12.95,12.7533295 12.95,13.52 C12.95,14.2866705 13.0816654,14.8866645 13.345,15.32 C13.6083346,15.7533355 13.9599978,15.97 14.4,15.97 Z M14.4575629,6.91876181 L16.5423928,4 L14.4575629,1.08123819 L16.0850299,-0.0812381937 L19.0002,4 L16.0850299,8.08123819 L14.4575629,6.91876181 Z"></path>
					</svg>
				</div>
				<div class="button" id="volume" @mouseenter="showPopup('volume')" @mouseleave="hidePopup" @click="setVolumeEnabled(!this.volume_enabled)">
					<svg viewBox="0 0 24 24" v-if="this.volume_enabled">
						<path fill="currentColor" d="M9,7.82842712 L6.82842712,10 L4,10 L4,14 L6.82842712,14 L9,16.1715729 L9,7.82842712 Z M11,21 L6,16 L2,16 L2,8 L6,8 L11,3 L11,21 Z M13.7437869,16.3889482 L12.3295734,14.9747347 C13.9546583,13.3496497 13.9546583,10.7148664 12.3295734,9.08978146 L13.7437869,7.6755679 C16.1499205,10.0817014 16.1499205,13.9828147 13.7437869,16.3889482 Z M16.2137399,18.2137399 L14.7995264,16.7995264 C17.4324159,14.1666368 17.4324159,9.89787935 14.7995264,7.26498977 L16.2137399,5.8507762 C19.6276781,9.26471437 19.6276781,14.7998018 16.2137399,18.2137399 Z M18.6836929,20.0385316 L17.2694793,18.6243181 C20.9101736,14.9836239 20.9101736,9.08089228 17.2694793,5.44019807 L18.6836929,4.02598451 C23.1054357,8.4477273 23.1054357,15.6167888 18.6836929,20.0385316 Z"></path>
					</svg>
					<svg viewBox="0 0 24 24" v-else>
						<path fill="currentColor" d="M9,7.82842712 L6.82842712,10 L4,10 L4,14 L6.82842712,14 L9,16.1715729 L9,7.82842712 Z M11,21 L6,16 L2,16 L2,8 L6,8 L11,3 L11,21 Z M17,10.5857864 L20.2928932,7.29289322 L21.7071068,8.70710678 L18.4142136,12 L21.7071068,15.2928932 L20.2928932,16.7071068 L17,13.4142136 L13.7071068,16.7071068 L12.2928932,15.2928932 L15.5857864,12 L12.2928932,8.70710678 L13.7071068,7.29289322 L17,10.5857864 Z"></path>
					</svg>
					<div class="popup" v-if="show_volume_popup && volume_enabled" id="volume_slider">
						<div class="bar" ref="volume_bar" @click="moveVolumeCursor">
							<div class="progress" :style="{height: volume_value + '%'}"></div>
							<div class="cursor" :style="{bottom: volume_value + '%'}" @mousedown="startMoveVolumeCursor" @mouseup="endMoveVolumeCursor"></div>
						</div>
					</div>
					<div class="back" v-if="show_volume_popup"></div>
				</div>
			</div>
			<p class="film_name">{{ film_name }}</p>
			<div class="config_buttons_container">
				<div class="button" id="audio_subtitle_button" @mouseenter="showPopup('audio')" @mouseleave="hidePopup">
					<svg viewBox="0 0 24 24">
						<path fill="currentColor" d="M5,15 L5,13 L12,13 L12,15 L5,15 Z M14,15 L14,13 L19,13 L19,15 L14,15 Z M10,9 L10,11 L5,11 L5,9 L10,9 Z M11.9998571,11 L12.0001429,9.00000001 L19.0001429,9.00100001 L18.9998571,11.001 L11.9998571,11 Z M17,17 L21,17 L21,5 L3,5 L3,17 L12.9968832,17 L17,19.4392488 L17,17 Z M1,3 L23,3 L23,19 L19,19 L19,22.9999671 L12.4355463,19 L1,19 L1,3 Z"></path>
					</svg>
					<div class="popup" v-if="show_audio_popup" id="audio_subtitle_popup">
						<div class="category" id="audio">
							<p class="name">Audio</p>
							<div class="values">
								<p @click="switchAudio(audio)" :class="{selected: audio === this.audio}" v-for="audio in audios" :key="audio.id">
									<span>
										<svg viewBox="0 0 24 24">
											<path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path>
										</svg>
									</span>
									{{ audio.value }}
								</p>
							</div>
						</div>
						<div class="category" id="subtitles">
							<p class="name">Subtitles</p>
							<div class="values">
								<p @click="disableSubtitle" :class="{selected: this.subtitle == null}" id="disabled">
									<span>
										<svg viewBox="0 0 24 24">
											<path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path>
										</svg>
									</span>
									<!-- {{ this.subtitle }} -->
									Disabled
								</p>
								<p @click="switchSubtitle(subtitle)" :class="{selected: this.subtitle === subtitle}" v-for="subtitle in subtitles" :key="subtitle.id">
									<span>
										<svg viewBox="0 0 24 24">
											<path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"></path>
										</svg>
									</span>
									{{ subtitle.value }}
								</p>
							</div>
						</div>
					</div>
					<div class="back" v-if="show_audio_popup"></div>
				</div>
				<div class="button" id="speed_button" @mouseenter="showPopup('speed')" @mouseleave="hidePopup">
					<svg viewBox="3 3 28 28">
						<path fill="currentColor" d="M19.8023846,13.7111538 L22.0437692,15.0580769 L19.2865317,19.6534728 C19.4959852,20.029472 19.6153846,20.4622373 19.6153846,20.9224231 C19.6153846,22.3648077 18.4423846,23.5378077 17,23.5378077 C15.5576154,23.5378077 14.3846154,22.3648077 14.3846154,20.9224231 C14.3846154,19.4800385 15.5576154,18.3070385 17,18.3070385 C17.0149054,18.3070385 17.0297821,18.3071637 17.044629,18.3074133 L19.8023846,13.7111538 Z M28.7025597,25.4286405 C27.4615385,24.8461538 27.4615385,24.8461538 26.3609633,24.2636672 C27.0809129,22.8165686 27.4611462,21.2406017 27.4611462,19.6153846 C27.4611462,13.8370647 22.7779276,9.15384615 16.9996077,9.15384615 C11.2221213,9.15384615 6.53806923,13.8375388 6.53806923,19.6153846 C6.53806923,21.2391793 6.91888033,22.8151015 7.63955975,24.2636672 C6.53846154,24.8461538 6.53846154,24.8461538 5.29796333,25.4286405 C4.39964336,23.6230174 3.92268462,21.6492043 3.92268462,19.6153846 C3.92268462,12.3930568 9.77772922,6.53846154 16.9996077,6.53846154 C24.2223647,6.53846154 30.0765308,12.3926276 30.0765308,19.6153846 C30.0765308,21.6502951 29.600283,23.6242168 28.7025597,25.4286405 Z"></path>
					</svg>
					<div class="popup" id="speed_popup" v-if="show_speed_popup">
						<p>Speed</p>
						<div class="slider_container">
							<div class="line"></div>
							<div class="speed_item" @click="setSpeed(0.5)" :class="{selected: speed == 0.5}" data-value="0.5">
								<svg viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="4" fill="currentColor"></circle>
								</svg>
								<p>0.5x</p>
							</div>
							<div class="speed_item" @click="setSpeed(0.75)" :class="{selected: speed == 0.75}" data-value="0.75">
								<svg viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="4" fill="currentColor"></circle>
								</svg>
								<p>0.75x</p>
							</div>
							<div class="speed_item" @click="setSpeed(1.0)" :class="{selected: speed == 1.0}" data-value="1">
								<svg viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="4" fill="currentColor"></circle>
								</svg>
								<p>1.0x</p>
							</div>
							<div class="speed_item" @click="setSpeed(1.25)" :class="{selected: speed == 1.25}" data-value="1.25">
								<svg viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="4" fill="currentColor"></circle>
								</svg>
								<p>1.25x</p>
							</div>
							<div class="speed_item" @click="setSpeed(1.5)" :class="{selected: speed == 1.5}" data-value="1.5">
								<svg viewBox="0 0 8 8">
									<circle cx="4" cy="4" r="4" fill="currentColor"></circle>
								</svg>
								<p>1.5x</p>
							</div>
						</div>
					</div>
					<div class="back" v-if="show_speed_popup"></div>
				</div>
				<div class="button" id="fullscreen_button" @click="setFullscreen(!this.is_fullscreen)">
					<svg viewBox="0 0 24 24" v-if="is_fullscreen">
						<path fill="currentColor" d="M2,4 L22,4 L22,20 L2,20 L2,4 Z M6,8 L10,8 L10,6 L4,6 L4,10 L6,10 L6,8 Z M6,16 L6,14 L4,14 L4,18 L10,18 L10,16 L6,16 Z M18,8 L18,10 L20,10 L20,6 L14,6 L14,8 L18,8 Z M18,16 L14,16 L14,18 L20,18 L20,14 L18,14 L18,16 Z"></path>
					</svg>
					<svg viewBox="0 0 24 24" v-else>
						<path fill="currentColor" d="M4,6 L4,10 L2,10 L2,4 L8,4 L8,6 L4,6 Z M4,18 L8,18 L8,20 L2,20 L2,14 L4,14 L4,18 Z M6,8 L18,8 L18,16 L6,16 L6,8 Z M20,6 L16,6 L16,4 L22,4 L22,10 L20,10 L20,6 Z M20,18 L20,14 L22,14 L22,20 L16,20 L16,18 L20,18 Z"></path>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.control_bar
{
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 1rem 0.5rem;
}

.timeline_bar
{
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0.5rem 0.5rem;
}

.timeline_bar .bar
{
	position: relative;
	height: 0.25rem;
	width: 100%;
	background: grey;
	display: flex;
	cursor: pointer;
}

.timeline_bar:hover .bar
{
	height: 0.3rem;
}

.timeline_bar .progress
{
	background: red;
	width: 28%;
	height: 100%;
}

.timeline_bar .cursor
{
	position: absolute;
    top: 0;
    left: 28%;
    transform: translate(-50%, -25%);
	width: 0.75rem;
	height: 0.75rem;
	background: red;
	border-radius: 100%;
}

.control_container
{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin: 1rem 0;
}

.remaining_time
{
	margin: 0;
	margin-left: 0.5rem;
}

.film_name
{
	margin: 0;
}

.control_container > *
{
	display: flex;
}

.button
{
	position: relative;
	width: 7vw;
	max-width: 2rem;
	cursor: pointer;
	margin: 0 1.25vw;
	transition: all 0.125s;
}

.button:hover > svg
{
	transform: scale(1.2);
}

.popup
{
	position: absolute;
	padding: 1vw 1.25vw;
	background: #141414;
	z-index: 1;
}

.button .back
{
	position: absolute;
	top: 0;
	left: 50%;
	width: 100%;
	height: 5rem;
	transform: translate(-50%, -50%);
	z-index: 0;
}

#volume_slider
{
	top: 0;
	left: 50%;
	height: 20vh;
	max-height: 20rem;
	min-height: 10rem;
	transform: translate(-50%, -100%);
	padding: 1rem 0.5rem;
}

#volume_slider .bar
{
	position: relative;
	width: 0.375rem;
	height: 100%;
	background: grey;
}

#volume_slider .progress
{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50%;
	background: red;
}

#volume_slider .cursor
{
	position: absolute;
	bottom: 50%;
	left: 50%;
	width: 0.9rem;
	height: 0.9rem;
	transform: translate(-50%, 50%);
	transform-origin: center center;
	border-radius: 100%;
	background: red;
}

#volume_slider .cursor:hover
{
	transform: translate(-50%, 50%);
	width: 1.125rem;
	height: 1.125rem;
}

#audio_subtitle_popup
{
	position: fixed;
	bottom: calc(2rem + 5.5vw);
	right: 0;
	display: flex;
	height: 20rem;
	max-height: 75vh;
	padding: 0;
}

#audio_subtitle_popup .category
{
	display: flex;
	flex-direction: column;
	width: 50%;
}

#audio_subtitle_popup .category .name
{
	font-size: 1.25rem;
	font-weight: bold;
	margin: 0;
}

#audio_subtitle_popup .category .values
{
	display: flex;
	flex-direction: column;
	overflow-y: auto;
}

#audio_subtitle_popup .category p
{
	display: flex;
	align-items: center;
	padding: 1rem 3rem;
	font-size: 0.9rem;
}

#audio_subtitle_popup .category p span
{
	display: inline-block;
	margin: 0 0.5rem;
	width: 1.5rem;
	height: 0.75rem;
}

#audio_subtitle_popup .category p:not(.selected) span
{
	visibility: hidden;
}

#audio_subtitle_popup .category p svg
{
	width: 100%;
	height: 100%;
}

#audio_subtitle_popup .category .values p
{
	margin: 0;
}

#audio_subtitle_popup .category .values p:hover
{
	background: rgba(255, 255, 255, 0.1);
}

#speed_popup
{
	position: fixed;
	bottom: calc(2rem + 5.5vw);
	right: 0;
	padding: 2rem 2.5rem;
}

@media screen and (max-width: 500px)
{
	#speed_popup,
	#audio_subtitle_popup
	{
		width: 100%;
	}
}

#speed_popup > p
{
	font-size: 1.5rem;
}

#speed_popup .slider_container
{
	position: relative;
	margin-bottom: 2rem;
}

#speed_popup .line
{
	height: 0.125rem;
	width: 25rem;
	max-width: 50vw;
	background: grey;
}

#speed_popup .speed_item
{
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-0.625rem);
	transform-origin: center center;
}

@media screen and (max-width: 500px)
{
	#speed_popup .line
	{
		max-width: 100%;
		width: 100%;
	}	
}

#speed_popup .speed_item.selected
{
	transform: translateY(-0.5rem);
}

#speed_popup .speed_item.selected svg
{
	width: 1rem;
	height: 1rem;
}

#speed_popup .speed_item svg
{
	width: 0.75rem;
    height: 0.75rem;
}

/**
 * + 1 for the .line item
 */
#speed_popup .speed_item:nth-child(0n+3)
{
	left: 25%;
}

#speed_popup .speed_item:nth-child(0n+4)
{
	left: 50%;
}

#speed_popup .speed_item:nth-child(0n+5)
{
	left: 75%;
}

#speed_popup .speed_item:nth-child(0n+6)
{
	left: 100%;
}

#speed_popup .speed_item p
{
	margin: 0;
}

</style>