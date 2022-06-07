<script>
import { mapGetters } from 'vuex'

export default {
	name: "ProfileList",
	methods:
	{
		set_profile(profile)
		{
			this.$store.dispatch("account/setProfile", {profile});
			this.$router.push({name: "browse_index"});
		}
	},
	computed:
	{
		...mapGetters(
			{
				getProfiles: 'account/getProfiles'
			})
	}
}
</script>

<template>
	<div class="profile_list">
		<div class="profile_item" v-for="profile in getProfiles" :key="profile.id" @click="set_profile(profile)">
			<div class="img_container">
				<img :src="profile.image"/>
			</div>
			<p class="name">{{ profile.name }}</p>
		</div>
	</div>
</template>

<style scoped>

.profile_list
{
	display: flex;
	flex-wrap: wrap;
}

.profile_item
{
	flex-direction: column;
	cursor: pointer;
	color: gray;
	margin: 0 1vw;
}

.img_container
{
	width: 10vw;
	height: 10vw;
	border: solid 1px transparent;
	margin: 0 auto;
	transition: all 0.125s;
}

.profile_item:hover .img_container
{
	border-color: white;
}

.name
{
	transition: all 0.125s;
	text-align: center;
}

.profile_item:hover .name
{
	color: white;
}

@media screen and (max-width:499px)
{
	.img_container
	{
		width: 20vw;
		height: 20vw;
	}
}

</style>
