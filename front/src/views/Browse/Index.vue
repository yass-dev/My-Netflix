<script>

import Header from '@/components/Header';
import BillboardPresentation from '@/components/films_components/BillboardPresentation';
import FilmList from '@/components/films_components/FilmList';
import FilmPreview from '@/components/films_components/FilmPreview.vue';
import mapGetters from 'vuex';

export default {
	name: "Index",
	components:
	{
		Header,
		BillboardPresentation,
		FilmList,
		FilmPreview
	},
	data()
	{
		return {
			billboard_film:
			{
				id: 0,
				overview_img: "/films/0/overview.webp",
				synopsys: "Ce biopic retrace la vie du brillant mathématicien John Forbes Nash Jr., qui a dû lutter contre la schizophrénie tout en marquant l'histoire dans son domaine."
			},
			popular_films: this.$store.state.popular_films,
			preview_film: null,
		}
	},
	methods:
	{
		shuffle(orig)
		{
			let o = [...orig];
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		},
		showPreview(film)
		{
			this.preview_film = film;
		}
	},
}
</script>

<template>
	<div>
		<Header fixed/>
		<BillboardPresentation :film="billboard_film" @show_preview="showPreview"/>
		<FilmList name="Biggest success on Netflix" :films="popular_films" @show_preview="showPreview"/>
		<FilmList :name="'Resume with ' + this.$store.state.account.selected_profile.name + ' profile'" :films="shuffle(popular_films)" @show_preview="showPreview"/>
		<FilmList name="Current trends" :films="shuffle(popular_films)" @show_preview="showPreview"/>
		<FilmList name="Review" :films="shuffle(popular_films)" @show_preview="showPreview"/>
		<FilmList name="Top 10 in France today" :films="shuffle(popular_films)" numbered @show_preview="showPreview"/>
		<FilmList name="Comedies" :films="shuffle(popular_films)" @show_preview="showPreview"/>
		<FilmList name="Action movies" :films="shuffle(popular_films)" @show_preview="showPreview"/>
		<FilmList name="SF series" :films="shuffle(popular_films)" @show_preview="showPreview"/>
		<FilmPreview :film="preview_film" v-if="preview_film" @close="this.preview_film = null"/>
	</div>
</template>