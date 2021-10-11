<script>

import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

export default {
	name: 'AuthView',
	components: { SignIn, SignUp },
	data()
	{
		return {
			mode: 'login'
		}
	}
}
</script>

<template>
	<div class="auth_view">
		<SignIn v-if="mode == 'login'" @change_mode="mode = 'register'"/>
		<SignUp v-if="mode == 'register'" @change_mode="mode = 'login'"/>
	</div>	
</template>

<style scoped>

.auth_view
{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-image: url('/img/login-background.jpeg');
	background-attachment: fixed;
	background-size: 100% 100%;
}

</style>