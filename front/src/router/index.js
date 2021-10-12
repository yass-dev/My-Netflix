import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/views/Profile.vue'
import Browse from '@/views/Browse.vue';
import Index from '@/views/Browse/Index.vue';
import Review from '@/views/Browse/Review.vue';
import WatchView from '../views/WatchView.vue';
import AuthView from '../views/AuthView.vue';
import AccountStore from '../store/account';

const routes = [
	{
		path: '/',
		name: 'auth',
		component: AuthView,
		meta: {requiresAuth: false, requiresProfile: false},
	},
	{
		path: '/profiles',
		name: 'profiles',
		component: Profile,
		meta: {requiresAuth: true, requiresProfile: false},
	},
	{
		path: '/browse',
		name: "browse",
		component: Browse,
		meta: {requiresAuth: true, requiresProfile: true},
		children:
		[
			{
				path: '',
				name: "browse_index",
				component: Index
			},
			{
				name: "browse_watch_again",
				path: "watch-again",
				component: Review
			}
		],
	},
	{
		path: '/watch/:id',
		name: 'watch',
		component: WatchView,
		meta: {requiresAuth: true, requiresProfile: true},
	}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>
{
	if (to.matched.some(record => record.meta.requiresAuth))
	{
		if (AccountStore.state.id)
		{
			next();
			return ;
		}
		next('/')
	}
	else if (to.matched.some(record => record.meta.requiresProfile))
	{
		if (AccountStore.state.profile)
		{
			next();
			return ;
		}
		next('/profiles');
	}
	else
		next()
})

export default router
