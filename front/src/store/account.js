import * as AuthService from '../services/auth.service'

export default ({
	namespaced: true,
	state:
	{
		is_logged_in: false,
		access_token: null,
		user:
		{
			id: null,
			email: null,
			profiles: []
		},
		selected_profile: null,
	},
	mutations:
	{
		SET_ACCESS_TOKEN(state, {access_token})
		{
			state.access_token = access_token;
		},

		SET_PROFILE(state, {profile})
		{
			state.selected_profile = profile
		},

		SET_USER(state, {access_token, user})
		{
			state.is_logged_in = true;
			state.access_token = access_token;
			state.user = user;
		},

		RESTORE(state)
		{
			state.access_token = null;
			state.selected_profile = null;
			state.user.id = null;
			state.user.email = null;
			state.user.profiles = [];
		}
	},
	actions:
	{
		setProfile(store, {profile})
		{
			store.commit("SET_PROFILE", {profile: profile});
		},

		sign_in(store, {email: email, password: password})
		{
			return new Promise((resolve, reject) =>
			{
				AuthService.sign_in(email, password)
				.then(res =>
				{
					window.localStorage.setItem('access_token', res.access_token);
					store.dispatch('init')
					.then(() =>
					{
						resolve();
					})
					.catch(err => reject(err));
				})
				.catch(err =>
				{
					reject(err);
				})
			});
		},

		async logout(store)
		{
			await store.commit("RESTORE");
		}
	},
	getters:
	{
		getProfile(state)
		{
			return state.selected_profile;
		},

		getProfiles(state)
		{
			return state.user.profiles;
		},

		getOtherProfiles(state)
		{
			return state.user.profiles.filter(profile => profile != state.selected_profile)
		}
	},
})
