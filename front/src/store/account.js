import { createStore } from 'vuex';
import * as AuthService from '../services/auth.service'

export default ({
	namespaced: true,
	state:
	{
		id: null,
		email: null,
		profile: null,
		profiles_list: []
	},
	mutations:
	{
		SET_PROFILE(state, {profile: profile})
		{
			state.profile = profile;
		},

		INIT_ACCOUNT(state, {account: account})
		{
			state.id = account.id;
			state.email = account.email;
			state.profile = null;
			state.profiles_list = account.profiles;
		},
		RESTORE(state)
		{
			state.profile = null;
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
		
		async init(store)
		{
			return new Promise((resolve, reject) =>
			{
				AuthService.loadAccount()
				.then(account =>
				{
					store.commit('INIT_ACCOUNT', {account: account});
					console.log(account);
					resolve();
				})
				.catch(err =>
				{
					console.log(err);
					store.commit('RESTORE');
					reject();
				});
			})
		},

		logout(store)
		{
			store.commit("RESTORE");
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
	}
})
