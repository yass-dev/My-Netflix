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
				overview_img: "/films/0/overview.webp"
			},
			{
				id: 1,
				name: "Test B",
				overview_img: "/films/1/overview.webp"
			},
			{
				id: 2,
				name: "Test C",
				overview_img: "/films/2/overview.jpeg"
			},
			{
				id: 3,
				name: "Test D",
				overview_img: "/films/3/overview.jpeg"
			},
			{
				id: 4,
				name: "Test E",
				overview_img: "/films/5/overview.webp"
			},
			{
				id: 5,
				name: "Test F",
				overview_img: "/films/6/overview.webp"
			},
			{
				id: 6,
				name: "Test G",
				overview_img: "/films/7/overview.jpeg"
			},
			{
				id: 7,
				name: "Test H",
				overview_img: "/films/8/overview.webp"
			},
			{
				id: 8,
				name: "Test H",
				overview_img: "/films/9/overview.webp"
			},
			{
				id: 9,
				name: "Test H",
				overview_img: "/films/10/overview.webp"
			},
			{
				id: 10,
				name: "Test H",
				overview_img: "/films/11/overview.jpeg"
			},
			{
				id: 11,
				name: "Test H",
				overview_img: "/films/12/overview.webp"
			},
			{
				id: 12,
				name: "Test H",
				overview_img: "/films/13/overview.jpeg"
			},
			{
				id: 13,
				name: "Test H",
				overview_img: "/films/14/overview.jpeg"
			},
			{
				id: 14,
				name: "Test H",
				overview_img: "/films/15/overview.jpeg"
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
