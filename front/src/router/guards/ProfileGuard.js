import store from '@/store/account'

export function requireProfile(to, from, next)
{
	if (store.state.profile)
		next();
	else
		next("/profiles");
}