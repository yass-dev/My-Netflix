import store from '@/store/account'
import AuthGuard from './AuthGuard';

export function requireProfile(to, from, next)
{
	if (AuthGuard(to, from, next))
		console.log("Yes")
	else
		console.log('no');

	if (store.state.profile)
		next();
	else
		next("/profiles");
}