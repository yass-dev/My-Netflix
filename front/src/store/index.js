import { createStore } from 'vuex'
import AccountStore from './account';
import MyProfileStore from './my_profile';
import createPersistedState from "vuex-persistedstate";

export default createStore({
	namespaced: true,
	state:
	{
		popular_films:
		[
			{
				id: 0,
				name: "Test A",
				overview_img: "/films/0/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 1,
				name: "Test B",
				overview_img: "/films/1/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 2,
				name: "Test C",
				overview_img: "/films/2/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 3,
				name: "Test D",
				overview_img: "/films/3/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 4,
				name: "Test E",
				overview_img: "/films/5/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 5,
				name: "Test F",
				overview_img: "/films/6/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 6,
				name: "Test G",
				overview_img: "/films/7/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 7,
				name: "Test H",
				overview_img: "/films/8/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 8,
				name: "Test H",
				overview_img: "/films/9/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 9,
				name: "Test H",
				overview_img: "/films/10/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 10,
				name: "Test H",
				overview_img: "/films/11/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 11,
				name: "Test H",
				overview_img: "/films/12/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 12,
				name: "Test H",
				overview_img: "/films/13/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 13,
				name: "Test H",
				overview_img: "/films/14/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
			{
				id: 14,
				name: "Test H",
				overview_img: "/films/15/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"],
				synopsys: "Si John et Jane ont toutes les apparences d'un couple lambda, c'est qu'ils ignorent faire tous deux partie de la même confrérie : celle des mercenaires payés pour tuer."
			},
		]
	},
	mutations:
	{

	},
	actions:
	{

	},
	modules:
	{
		account: AccountStore,
		my_profile: MyProfileStore
	},
	plugins:
	[
		createPersistedState({
			paths: ['account', 'my_profile']
		}),
	]
})
