<script>

import Header from '@/components/Header';
import BillboardPresentation from '@/components/BillboardPresentation';
import FilmList from '@/components/FilmList';

export default {
	name: "Index",
	components:
	{
		Header,
		BillboardPresentation,
		FilmList,
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
			popular_films: this.$store.state.popular_films
		}
	},
	methods:
	{
		shuffle(orig)
		{
			let o = [...orig];
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}
	}
}
</script>

<template>
	<div>
		<Header fixed/>
		<BillboardPresentation :film="billboard_film"/>
		<FilmList name="Biggest success on Netflix" :films="popular_films"/>
		<FilmList :name="'Resume with ' + this.$store.state.account.name + ' profile'" :films="shuffle(popular_films)"/>
		<FilmList name="Current trends" :films="shuffle(popular_films)"/>
		<FilmList name="Review" :films="shuffle(popular_films)"/>
		<FilmList name="Top 10 in France today" :films="shuffle(popular_films)" numbered/>
		<FilmList name="Comedies" :films="shuffle(popular_films)"/>
		<FilmList name="Action movies" :films="shuffle(popular_films)"/>
		<FilmList name="SF series" :films="shuffle(popular_films)"/>
	</div>
</template>