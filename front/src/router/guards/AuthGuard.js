import store from '@/store/account'

export default async function AuthGuard(to, from, next)
{
	console.log(store.state.id, getInstance());
	if (store.state.id)
		next();
	else
		next('/')
}