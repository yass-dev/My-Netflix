import { createStore } from 'vuex'
import AccountStore from './account';

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
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 1,
				name: "Test B",
				overview_img: "/films/1/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 2,
				name: "Test C",
				overview_img: "/films/2/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 3,
				name: "Test D",
				overview_img: "/films/3/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 4,
				name: "Test E",
				overview_img: "/films/5/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 5,
				name: "Test F",
				overview_img: "/films/6/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 6,
				name: "Test G",
				overview_img: "/films/7/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 7,
				name: "Test H",
				overview_img: "/films/8/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 8,
				name: "Test H",
				overview_img: "/films/9/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 9,
				name: "Test H",
				overview_img: "/films/10/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 10,
				name: "Test H",
				overview_img: "/films/11/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 11,
				name: "Test H",
				overview_img: "/films/12/overview.webp",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 12,
				name: "Test H",
				overview_img: "/films/13/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 13,
				name: "Test H",
				overview_img: "/films/14/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
			},
			{
				id: 14,
				name: "Test H",
				overview_img: "/films/15/overview.jpeg",
				tags: ["Vibrant", "Action", "Thriller"]
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
		account: AccountStore
	}
})
