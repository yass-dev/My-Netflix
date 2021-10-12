<script>
import { mapGetters } from 'vuex'

export default {
	name: "ProfileList",
	data()
	{
		return {
			profiles: this.$store.state.account.profiles_list,
			// unsubscribe: this.$store.subscribe(this.reloadProfiles)
		}
	},
	methods:
	{
		reloadProfiles(mutation, state)
		{
			if (mutation.type == "account/INIT_ACCOUNT")
				this.profiles = this.$store.state.account.profiles_list
		},
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
