<script>
export default
{
	name: "FilmGallery",
	props:
	{
		name:
		{
			type: String,
			required: true,
		},
		films:
		{
			type: Array,
			required: true
		},
		limit:
		{
			type: Number,
			required: false,
			default: 15
		}
	},
	methods:
	{
		loadMore()
		{
			this.$emit("load_more");
		},
		showPreview(film)
		{
			this.$emit("show_preview", film);
		}
	}
}
</script>

<template>
	<div class="film_gallery">
		<h2>{{ name }}</h2>
		<div class="gallery">
			<div class="gallery_item" v-for="(film) in films" :key="film.id" @click="showPreview(film)">
				<div class="image_container">
					<img :src="film.overview_img"/>
				</div>
			</div>
		</div>
		<div class="more_div">
			<div class="line"></div>
			<div class="more_button" @click="loadMore">
				<svg>
					<use href="#chevron-down"></use>
				</svg>
			</div>
		</div>
	</div>
</template>

<style scoped>

.film_gallery
{
	display: flex;
	flex-direction: column;
}

h2
{
	font-size: 1rem;
	font-weight: normal;
}

.gallery
{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 1rem;
	column-gap: 0.4rem;
}

@media screen and (min-width: 1101px) and (max-width:1400px)
{
    .gallery
	{
		grid-template-columns:repeat(5,1fr);
	}
}

@media screen and (min-width: 801px) and (max-width:1100px)
{
    .gallery
	{
		grid-template-columns: repeat(4,1fr);
		
	}
}

@media screen and (min-width: 501px) and (max-width:800px)
{
    .gallery
	{
		grid-template-columns:repeat(3,1fr);
	}
}

@media screen and (max-width: 500px)
{
    .gallery
	{
		grid-template-columns:repeat(2,1fr);
	}
}

.gallery_item
{
	cursor: pointer;
}

.image_container
{
	width: 100%;
	height: 100%;
}

.image_container img
{
	width: 100%;
	height: 100%;
}

.more_div
{
	position: relative;
	padding: 2rem 0;
}

.more_div .line
{
	background: rgba(122, 122, 122, 0.5);
	width: 100%;
	height: 0.125rem;
}

.more_button
{
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 50%;
	left: 50%;
	padding: 0.5vw;
	transform: translate(-50%, -50%);
	cursor: pointer;
	border: solid 1px rgba(255, 255, 255, 0.8);
	border-radius: 100%;
	background-color: #222;
	transition: all 0.25s
}

.more_button:hover
{
	background-color: #333;
}

.more_button svg
{
	display: block;
	width: 1.5vw;
	height: 1.5vw;
	margin: 0 auto;
}

</style>
