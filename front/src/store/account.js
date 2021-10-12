import { createStore } from 'vuex';
import * as AuthService from '../services/auth.service'

export default ({
	namespaced: true,
	state:
	{
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
			state.profile = null;
			state.profiles_list = account.profiles;
		}
	},
	actions:
	{
		setProfile(store, {profile})
		{
			store.commit("SET_PROFILE", {profile: profile});
		},
		
		init(store)
		{
			AuthService.loadAccount().then(account =>
			{
				store.commit('INIT_ACCOUNT', {account: account})
			})
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
