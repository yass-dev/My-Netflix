<script>
import Header from '../components/Header.vue';
import BillboardPresentation from '../components/films_components/BillboardPresentation.vue';
import FilmList from '../components/films_components/FilmList.vue';
import { mapGetters } from 'vuex';
import SvgLib from '../components/SvgLib.vue';

export default {
	name: "MyProfile",
	components: { Header, BillboardPresentation, FilmList, SvgLib },
	data()
	{
		return {
			my_video:
			{
				id: 0,
				overview_img: null,
				overview_video: "/films/0/video.mp4",
				synopsys: "Ce biopic retrace la vie du brillant mathématicien John Forbes Nash Jr., qui a dû lutter contre la schizophrénie tout en marquant l'histoire dans son domaine."
			},
		}
	},
	computed:
	{
		...mapGetters(
		{
			best_skills: 'my_profile/getBestSkills',
			programming_languages: 'my_profile/getProgrammingLanguages',
			backend_skills: 'my_profile/getBackendSkills',
			frontend_skills: 'my_profile/getFrontendSkills',
			software_skills: 'my_profile/getSoftwareSkills'
		})
	}
}
</script>


<template>
	<div class="my_profile_view">
		<Header fixed/>
		<BillboardPresentation :film="my_video"/>
		<FilmList :films="best_skills" name="My Best Skills"/>
		<FilmList :films="programming_languages" name="Mastered Programming Languages"/>
		<FilmList :films="frontend_skills" name="Back-end Skills"/>
		<FilmList :films="software_skills" name="Front-end Skills"/>
		<SvgLib/>
	</div>
</template>

<style scoped>

.my_profile_view
{
	padding-bottom: 2rem;
	background: #141414;
}

</style>