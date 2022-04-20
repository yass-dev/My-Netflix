<script>


export default {
	name: "FilmList",
	props:
	{
		name:
		{
			type: String,
			required: true
		},
		films:
		{
			type: Array,
			required: true
		},
		numbered:
		{
			type: Boolean,
			default: false,
			required: false
		}
	},
	data()
	{
		return {
			offset: 0,
			preview_film: null,
			slide_per_view: 0,
			show_left_swipe_button: false,
			show_right_swipe_button: false
		}
	},
	created()
	{
		if (this.films.length > 10 && this.numbered)
			this.films.splice(10);
	},
	mounted()
	{
		if (this.numbered)
			console.log("I AM NUMBERED => ", this.films.length)
		this.setSlidePerView();
		this.handleSwipeButtonsVisibility();
		window.addEventListener('resize', this.setSlidePerView);
	},
	beforeUnmount()
	{
		window.removeEventListener('resize', this.setSlidePerView);
	},
	methods:
	{
		handleSwipeButtonsVisibility()
		{
			let films_in_overflow = this.films.length - this.slide_per_view * (-this.offset);
			if (films_in_overflow > this.slide_per_view)
				this.show_right_swipe_button = true;
			else
				this.show_right_swipe_button = false;
			
			if (this.offset < 0)
				this.show_left_swipe_button = true;
			else
				this.show_left_swipe_button = false;
		},
		setSlidePerView()
		{
			let width = window.innerWidth;
			if (width < 500)
				this.slide_per_view = 2;
			else if (width < 800)
				this.slide_per_view = 3;
			else if (width < 1100)
				this.slide_per_view = 4;
			else if (width < 1400)
				this.slide_per_view = 5;
			else
				this.slide_per_view = 6;
		},
		swipe_right()
		{
			this.offset--;
			this.handleSwipeButtonsVisibility();
		},
		swipe_left()
		{
			this.offset++;
			this.handleSwipeButtonsVisibility();
		},
		show_preview(film)
		{
			this.preview_film = film;
		},
		hide_preview()
		{
			this.preview_film = null;
		},
		showPreview(film)
		{
			this.$emit('show_preview', film);
		}
	}
}
</script>

<template>
	<div class="film_list" :class="{numbered: numbered}">
		<div class="relative">
			<p class="category_name">{{ name }}</p>
			<div class="slider">
				<div class="left_button swipe_button" @click="swipe_left" v-if="show_left_swipe_button">
					<i class="fas fa-chevron-left"></i>
				</div>
				<div class="slide_content">
					<div class="slide_container" :style="{transform: 'translateX(' + offset * 100 + '%)'}" ref="slide_container">
						<div class="slide" @click="showPreview(film)" v-for="(film, index) in films" :key="film.id">
							<svg v-if="numbered">
								<use :href="'#rank-' + (index + 1)"></use>
							</svg>
							<div class="image_container">
								<img :src="film.overview_img"/>
							</div>
						</div>
					</div>
				</div>
				<div class="right_button swipe_button" @click="swipe_right" v-if="show_right_swipe_button">
					<i class="fas fa-chevron-right"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.film_list
{
	margin: 3vw 0;
	width: 100%;
	z-index: 1;
}

.category_name
{
	font-size: 0.9rem;
	font-weight: bold;
	padding: 0 4%;
	margin-bottom: 0.25rem;
}

.slider
{
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	overflow: hidden;
}

.slide
{
	position: relative;
	cursor: pointer;
	padding: 0 2px;
	flex: 0 0 25%;
	width: 25%;
}

@media screen and (max-width:499px)
{
	.slide
	{
		flex: 0 0 50%;
	}
}

@media screen and (min-width:500px) and (max-width:799px)
{
	.slide
	{
		flex: 0 0 33.333333%;
	}
}

@media screen and (min-width:800px) and (max-width:1099px)
{
	.slide
	{
		flex: 0 0 25%;
	}
}

@media screen and (min-width:1100px) and (max-width:1399px)
{
	.slide
	{
		flex: 0 0 20%;
	}
}

@media screen and (min-width:1400px)
{
	.slide
	{
		flex: 0 0 16.66666667%;
	}
}

.slide:first-child
{
	padding-left: 0;
}

.slide_content
{
	width: 100%;
	padding: 0 4%;
}

.slide_container
{
	display: flex;
	transition: all 0.5s ease-in-out;
}

.numbered .slide
{
	position: relative;
}

.numbered .slide svg
{
	position: absolute;
	top: 0;
	left: 0;
	width: 50%;
	height: 100%;
	background: #141414;
}

.slide .image_container,
.slide img
{
	height: 100%;
	background: #141414;
}

.swipe_button
{
	position: absolute;
	display: flex;
	align-items: center;
	z-index: 1;
	top: 0;
	padding: 0 1rem;
	width: 4%;
	height: 100%;
	cursor: pointer;
	font-size: 1.5rem;
	transition: all 0.125s;
}

.swipe_button:not(:first-child)
{
	background: rgba(20,20,20,.5);
}

.swipe_button *
{
	opacity: 0;
}

.film_list:hover .swipe_button *
{
	opacity: 1;
}

.right_button
{
	right: 0;
}

</style>
