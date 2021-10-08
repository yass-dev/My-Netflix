import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/views/Profile.vue'
import Browse from '@/views/Browse.vue';
import Index from '@/views/Browse/Index.vue';
import Review from '@/views/Browse/Review.vue';
import WatchView from '../views/WatchView.vue';

import * as ProfileGuard from './guards/ProfileGuard';

const routes = [
	{
		path: '/profiles',
		name: 'profile',
		component: Profile
	},
	{
		path: '/browse',
		name: "browse",
		component: Browse,
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
		beforeEnter: ProfileGuard.requireProfile,
	},
	{
		path: '/watch/:id',
		name: 'watch',
		component: WatchView,
		// beforeEnter: ProfileGuard.requireProfile
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
