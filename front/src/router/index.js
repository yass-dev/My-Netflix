import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/views/Profile.vue'
import Browse from '@/views/Browse.vue';
import Index from '@/views/Browse/Index.vue';
import Review from '@/views/Browse/Review.vue';
import WatchView from '../views/WatchView.vue';
import AuthView from '../views/AuthView.vue';
import MyProfile from '../views/MyProfile';
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
	},
	{
		path: '/my-profile',
		name: 'my_profile',
		component: MyProfile,
		meta: {requiresAuth: false, requiresProfile: false}
	}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>
{
	if (to.matched.some(record => record.meta.requiresAuth) && AccountStore.state.is_logged_in == false)
		next({name: 'auth'});
	else if (to.matched.some(record => record.meta.requiresProfile) && AccountStore.state.selected_profile == null)
		next({name: 'profiles'});
	else
		next();
})

export default router
