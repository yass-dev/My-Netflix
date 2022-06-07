<script>

import * as AuthService from '../../services/auth.service';

export default {
	name: 'SignIn',
	data()
	{
		return {
			email: 'yass@gmail.com',
			password: 'test'
		}
	},
	methods:
	{
		goToSignUp()
		{
			this.$emit('change_mode')
		},
		signIn(e)
		{
			e.preventDefault();

			AuthService.sign_in(this.email, this.password)
			.then(({access_token, user}) =>
			{
				this.$store.commit('account/SET_USER', {access_token, user});
				this.$router.push({name: 'profiles'});
			})
			.catch(err =>
			{
				alert(`${err.message} (${err.code})`);
			})
		}
	}
}
</script>

<template>
	<div class="sign_in">
		<h1>Sign in</h1>
		<form @submit="signIn">
			<input type="text" placeholder="Email" v-model="email"/>
			<input type="password" placeholder="Password" v-model="password"/>
			<input type="submit" id="sign_in_button" value="Sign in"/>
		</form>
		<p @click="goToSignUp">New to Netflix ? <span>Sign up now</span></p>
	</div>
</template>

<style scoped>

.sign_in
{
	display: flex;
	flex-direction: column;
	padding: 2rem 4rem;
	background: rgba(0, 0, 0, 0.7);
	color: white;
	width: 40vw;
	min-width: 15rem;
	max-width: 25rem;
}

@media screen and (max-width: 500px)
{
	.sign_in
	{
		padding: 1rem 2rem;
	}
}

.sign_in form > *
{
	width: 100%;
}

h1
{
	margin: 0.5rem 0;
}

input
{
	display: block;
	padding: 0.5rem 0.75rem;
	background: grey;
	margin: 0.5rem 0;
	outline: none;
	color: white;
	font-size: 1rem;
	border: none;
	border-radius: 0.25rem;
}

input::placeholder
{
	color: rgba(255, 255, 255, 0.507);
}

#sign_in_button
{
	padding: 0.5rem 1rem;
	background: red;
	margin: 1rem 0;
	text-align: center;
	cursor: pointer;
}

p
{
	cursor: pointer;
}

span
{
	text-decoration: underline;
}

</style>
