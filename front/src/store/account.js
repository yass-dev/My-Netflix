import { createStore } from 'vuex'

export default ({
	namespaced: true,
	state:
	{
		profile: null,
		profiles_list:
			[
				{
					id: 0,
					img: "/img/profiles/0/0.png",
					name: "Fabricio"
				},
				{
					id: 1,
					img: "/img/profiles/0/1.png",
					name: "Jean"
				},
				{
					id: 2,
					img: "/img/profiles/0/2.png",
					name: "Anthony"
				},
				{
					id: 3,
					img: "/img/profiles/0/3.png",
					name: "Maxime"
				},
			]
	},
	mutations:
	{
		SET_PROFILE(state, {profile: profile})
		{
			state.profile = profile;
		}
	},
	actions:
	{
		setProfile: (store, {profile}) =>
		{
			store.commit("SET_PROFILE", {profile: profile});
		}
	},
})
