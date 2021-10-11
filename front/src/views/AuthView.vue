<script>
export default {
	name: 'AuthView',
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
		<div v-if="mode == 'login'" class="login_div">
			<p @click="this.mode = 'register'">Login</p>
		</div>
		<div v-if="mode == 'register'" class="register_div">
			<p @click="this.mode = 'login'">Register</p>
		</div>
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