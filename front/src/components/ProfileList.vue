<script>
export default {
	name: "ProfileList",
	data()
	{
		return {
			profiles: this.$store.state.account.profiles_list
		}
	},
	methods:
	{
		set_profile(profile)
		{
			this.$store.dispatch("account/setProfile", {profile});
			this.$router.push({name: "browse_index"});
		}
	}
}
</script>

<template>
	<div class="profile_list">
		<div class="profile_item" v-for="profile in profiles" :key="profile.id" @click="set_profile(profile)">
			<div class="img_container">
				<img :src="profile.img"/>
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
	display: flex;
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

</style>
