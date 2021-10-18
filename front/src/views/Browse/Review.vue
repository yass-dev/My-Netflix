<script>

import Header from '@/components/Header';
import FilmGallery from '../../components/films_components/FilmGallery.vue';
import FilmPreview from '../../components/films_components/FilmPreview.vue';

export default {
	name: "Review",
	components:
	{
		Header,
		FilmGallery,
		FilmPreview
	},
	data()
	{
		return {
			films: this.$store.state.popular_films,
			series: this.$store.state.popular_films,
			preview_film: null
		};
	},
	methods:
	{
		loadMore(type)
		{
			if (type == 'series')
				this.series = this.series.concat(this.$store.state.popular_films);
			else
				this.films = this.films.concat(this.$store.state.popular_films);
		},
		showPreview(film)
		{
			console.log("WSH");
			this.preview_film = film;
		}
	}
}
</script>

<template>
	<div class="review">
		<Header/>
		<div class="content">
			<h1>Review</h1>
			<FilmGallery name="Series" :films="series" @load_more="loadMore('series')" @show_preview="showPreview"/>
			<FilmGallery name="Films" :films="films" @load_more="loadMore('films')" @show_preview="showPreview"/>
			<FilmPreview :film="preview_film" v-if="preview_film" @close="this.preview_film = null"/>
		</div>
	</div>
</template>

<style scoped>

h1
{
	font-size: 2.5rem;
}

.content
{
	margin: 0 4%;
}

</style>