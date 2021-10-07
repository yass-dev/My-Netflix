<script>

import Header from '@/components/Header';
import FilmGallery from '../../components/FilmGallery.vue';

export default {
	name: "Review",
	components:
	{
		Header,
		FilmGallery
	},
	data()
	{
		return {
			films: this.$store.state.popular_films,
			series: this.$store.state.popular_films,
		};
	},
	methods:
	{
		loadMore(type)
		{
			alert("Load more " + type);
		}
	}
}
</script>

<template>
	<div class="review">
		<Header/>
		<div class="content">
			<h1>Review</h1>
			<FilmGallery name="Series" :films="series" @load_more="loadMore('series')"/>
			<FilmGallery name="Films" :films="series" @load_more="loadMore('films')"/>
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