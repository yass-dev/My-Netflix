import { createStore } from 'vuex';
import * as AuthService from '../services/auth.service'

export default ({
	namespaced: true,
	state:
	{
		id: null,
		email: null,
		profile_name: null,
		profile_img: null,
		profiles_list: []
	},
	mutations:
	{
		SET_PROFILE(state, {profile: profile})
		{
			state.profile_name = profile.name;
			state.profile_img = profile.img;
		},

		INIT_ACCOUNT(state, {account: account})
		{
			console.log("INITTT", account);
			state.id = account.id;
			state.email = account.email;
			state.profiles_list = account.profiles;
			console.log("INITTT", state);
		},
		RESTORE(state)
		{
			state.profile_name = null;
			state.profile_img = null;
			state.profiles_list = [];
			state.id = null;
			state.email = null;
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
		
		async init(store)
		{
			return new Promise((resolve, reject) =>
			{
				AuthService.loadAccount()
				.then(account =>
				{
					store.commit('INIT_ACCOUNT', {account: account});
					resolve();
					return ;
				})
				.catch(err =>
				{
					console.log(err);
					store.commit('RESTORE');
					reject(err);
					return ;
				});
			})
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
			return state.profile;
		},

		getProfiles(state)
		{
			return state.profiles_list;
		},

		getOtherProfiles(state)
		{
			return state.profiles_list.filter(profile => profile != state.profile)
		}
	},
})
