<script>

import * as AuthService from '../../services/auth.service';

export default {
	name: 'SignIn',
	methods:
	{
		goToSignUp()
		{
			this.$emit('change_mode')
		},
		signIn(e)
		{
			e.preventDefault();
			let email = this.$refs.email.value;
			let password = this.$refs.password.value;

			this.$store.dispatch('account/sign_in', {email: email, password: password})
			.then(() =>
			{
				this.$router.push('/profiles');
			})
			.catch(err =>
			{
				if (err.response.status == 401)
					alert("Invalid credentials");
				console.log("Error =>", err);
			})
		}
	}
}
</script>

<template>
	<div class="sign_in">
		<h1>Sign in</h1>
		<form @submit="signIn">
			<input type="text" placeholder="Email" ref="email" value="yass@gmail.com"/>
			<input type="password" placeholder="Password" ref="password"/>
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
