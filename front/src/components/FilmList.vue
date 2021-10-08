<script>

import FilmPreview from './FilmPreview';

export default {
	name: "FilmList",
	components: {FilmPreview},
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
			preview_film: null
		}
	},
	created()
	{
		if (this.films.length > 10 && this.numbered)
			this.films.splice(0, 10);
	},
	mounted()
	{
		console.log(this.$refs);
	},
	methods:
	{
		swipe_right()
		{
			this.offset--;
		},
		swipe_left()
		{
			this.offset++;
		},
		show_preview(film)
		{
			this.preview_film = film;
		},
		hide_preview()
		{
			this.preview_film = null;
		},
	}
}
</script>

<template>
	<div class="film_list" :class="{numbered: numbered}">
		<div class="relative">
			<p class="category_name">{{ name }}</p>
			<div class="slider">
				<div class="left_button swipe_button" @click="swipe_left">
					<i class="fas fa-chevron-left"></i>
				</div>
				<div class="slide_content">
					<div class="slide_container" :style="{transform: 'translateX(' + offset * 100 + '%)'}">
						<div class="slide" v-for="(film, index) in films" :key="film.id">
							<svg v-if="numbered">
								<use :href="'#rank-' + (index + 1)"></use>
							</svg>
							<div class="image_container">
								<img :src="film.overview_img"/>
							</div>
						</div>
					</div>
				</div>
				<div class="right_button swipe_button" @click="swipe_right">
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
