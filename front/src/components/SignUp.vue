<script>
export default {
	name: 'SignUp',
	methods:
	{
		goToSignIn()
		{
			this.$emit('change_mode')
		}
	}
}
</script>

<template>
	<div class="sign_up">
		<h1>Sign up</h1>
		<input type="text" placeholder="Email" ref="email"/>
		<input type="password" placeholder="Password" ref="password"/>
		<div id="sign_up_button">Sign up</div>
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
	max-width: 30rem;
}

@media screen and (max-width: 500px)
{
	.sign_up
	{
		padding: 1rem 2rem;
	}
}

.sign_up > *
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
