<script>

import * as AuthService from '../../services/auth.service';

export default {
	name: 'SignUp',
	data()
	{
		return {
			email: '',
			password: ''
		}
	},
	methods:
	{
		goToSignIn()
		{
			this.$emit('change_mode')
		},

		signUp(e)
		{
			e.preventDefault();

			AuthService.sign_up(this.email, this.password)
			.then(res =>
			{
				alert(res.message);
				this.goToSignIn();
			})
			.catch(err =>
			{
				console.error(err.response.data)
				alert(`${err.response.data.message} (${err.response.data.statusCode})`);
			})
		}
	}
}
</script>

<template>
	<div class="sign_up">
		<h1>Sign up</h1>
		<form @submit="signUp">
			<input type="text" placeholder="Email" v-model="email"/>
			<input type="password" placeholder="Password" v-model="password"/>
			<input type="submit" id="sign_up_button" value="Sign up"/>
		</form>
		<p @click="goToSignIn">Already on Netflix ? <span>Sign in now</span></p>
	</div>
</template>

<style scoped>

.sign_up
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
	.sign_up
	{
		padding: 1rem 2rem;
	}
}

form > *
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

#sign_up_button
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
