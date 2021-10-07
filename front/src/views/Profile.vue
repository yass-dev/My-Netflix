<script>

import ProfileList from '@/components/ProfileList.vue';

export default {
	name: "Profile",
	components:
	{
		ProfileList
	}
}
</script>

<template>
	<div class="profile">
		<p>Who's watching ?</p>
		<ProfileList/>
		<div id="manage_profiles_button">Manage profiles</div>
	</div>
</template>

<style scoped>

.profile
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100%;
}

p
{
	font-size: 2rem;
}

#manage_profiles_button
{
	margin: 1rem 0;
	border: solid 1px gray;
	color: gray;
	padding: 0.125rem 1rem;
	cursor: pointer;
	transition: all 0.125s;
}

#manage_profiles_button:hover
{
	color: white;
	border-color: white;
}

</style>
