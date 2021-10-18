<script>
import { mapGetters } from 'vuex';
export default {
	name: "Header",
	props:
	{
		fixed:
		{
			type: Boolean,
			required: false,
			default: false
		}
	},
	data()
	{
		return {
			opaque: false,
			search_expanded: false,
			expand_links: false
		}
	},
	methods:
	{
		expand_search(e)
		{
			e.stopPropagation();

			this.search_expanded = true;
			this.$refs.search_input.addEventListener("focusout", this.unexpand_search);
		},

		unexpand_search()
		{
			this.search_expanded = false;
			this.$refs.search_input.removeEventListener("focusout", this.unexpand_search);
		},

		scroll_handler(event)
		{
			if (window.scrollY > 0)
				this.opaque = true;
			else
				this.opaque = false;
		},

		show_account_popup()
		{
			this.$refs.account_popup.classList.add('active');
		},

		hide_account_popup()
		{
			this.$refs.account_popup.classList.remove('active');
		},

		switchProfile(profile)
		{
			this.$store.dispatch("account/setProfile", {profile: profile});
		},

		logout()
		{
			this.$store.dispatch('account/logout');
			this.$router.push("/")
		}
	},
	computed:
	{
		...mapGetters(
		{
			getProfiles: 'account/getOtherProfiles'
		})
	},
	mounted()
	{
		document.addEventListener("scroll", this.scroll_handler);
	},
	unmounted()
	{
		document.removeEventListener("scroll", this.scroll_handler);
	}
}
</script>

<template>
	<header :class="{fixed: fixed, opaque: opaque}">
		<router-link :to="{name: 'browse_index'}" class="logo icon"></router-link>
		<div class="links_container_toggler" @mouseenter="expand_links = true">
			Browse
		</div>
		<div class="links_container" :class="{active: expand_links}" @mouseleave="expand_links = false">
			<router-link :to="{name: 'browse_index'}">Home</router-link>
			<router-link :to="{name: 'browse_watch_again'}">Review</router-link>
			<router-link :to="{name: 'browse_index'}">Series</router-link>
			<router-link :to="{name: 'browse_index'}">Movies</router-link>
			<router-link :to="{name: 'browse_index'}">Most viewed</router-link>
			<router-link :to="{name: 'my_profile'}">My profile</router-link>
		</div>
		<div class="tool_nav">
			<div id="search_button" class="icon button" :class="{active: search_expanded}" @click="expand_search">
				<label for="search"></label>
				<input ref="search_input" type="text" id="search" placeholder="Title, people, genres..."/>
			</div>
			<div id="notification_button" class="icon button"></div>
			<div id="account_button" class="button" @mouseenter="show_account_popup" @mouseleave="hide_account_popup">
				<div class="profile_img_container">
					<img :src="this.$store.state.account.profile_img"/>
				</div>
				<div id="account_popup" ref="account_popup">
					<div class="chevron-up"></div>
					<div class="content">
						<section class="profile_section">
							<div class="profile_item" @click="switchProfile(profile)" v-for="(profile, index) in getProfiles" :key="index">
								<div class="image_container">
									<img :src="profile.img"/>
								</div>
								{{ profile.name }}
							</div>
							<p id="manage_profiles_button">Manage profiles</p>
						</section>
						<section>
							<p>Direct</p>
						</section>
						<section>
							<p>Account</p>
							<p>Help center</p>
							<p @click="logout">Logout</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>

@font-face
{
	font-family: 'nf-icon';
	src: url('/fonts/nf-icon.woff') format("woff");
}

header
{
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0.5rem 4%;
	background: transparent;
	transition: all 0.25s;
	z-index: 9;
}

header.fixed
{
	position: fixed;
	top: 0;
	left: 0;
}

@media screen and (max-width: 500px)
{
	header.fixed
	{
		position: static;
	}
}

header.opaque
{
	background-color: #141414;
}

.logo
{
	display: block;
    text-decoration: none;
    font-size: 1.25rem;
    color: #e50914;
	margin-right: 1rem;
}

.icon
{
	font-family: 'nf-icon';
}

.logo:before
{
	content: '\e5d0';
}

.links_container_toggler
{
	display: none;
	padding: 0.25rem 0.5rem;
    font-size: 1rem;
	cursor: pointer;
}

.links_container_toggler:after
{
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	top: 50%;
	border-style: solid;
	border-width: 5px 5px 0 5px;
	border-color: #fff transparent transparent transparent;
	margin-left: 5px;
	transform: translateY(-50%);
}

.links_container
{
	display: flex;
	align-items: center;
	max-width: 100%;
}

.links_container a
{
	margin: 0rem 1rem;
	font-size: 0.9rem;
}

@media screen and (max-width: 800px)
{
	.links_container_toggler
	{
		display: block;
	}

	.links_container
	{
		display: none;
		position: absolute;
		top: 4rem;
		left: calc(4.6rem + 4vw);
		flex-direction: column;
		transform: translateX(-25%);
		background: rgba(0, 0, 0, 0.85);
		z-index: 9;
	}

	.links_container.active
	{
		display: flex;
	}

	.links_container a
	{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250px;
		height: 50px;
		margin: 0;
		transition: all 0.25s;
	}

	.links_container a:hover
	{
		background: rgba(255, 255, 255, 0.05);
	}
}

.tool_nav
{
	display: flex;
	align-items: center;
	margin-left: auto;
}

.button
{
	cursor: pointer;
}

.tool_nav > *
{
	margin: 0 0.75rem;
}

#search_button
{
	display: flex;
    align-items: center;
	cursor: pointer;
	transition: all 0.3s;
}

.active#search_button
{
	border: solid 1px white;
}

#search_button label
{
	padding: 0.25rem 0.5rem;
	padding-right: 0;
	cursor: pointer;
	transition: all 0.5s;
}

#search_button label:before
{
	content: '\e636';
}

.active#search_button label
{
	background: rgba(0, 0, 0, 0.7);
}

#search_button input
{
	width: 0;
	padding: 0;
    border: 0;
	outline: none;
	color: white;
    background: rgba(0, 0, 0, 0.7);
	transition: all 0.5s;
}

#search_button input::placeholder
{
	font-size: 0.8rem;
	color: rgba(255, 255, 255, 0.7);
}

.active#search_button input
{
	width: 13rem;
	padding: 0.5rem 0.5rem;
	padding-right: 0;
}


#notification_button:before
{
	content: '\e663';
}

#account_button
{
	position: relative;
	margin: 0;
}

.profile_img_container
{
	width: 2.5rem;
	height: 2.5rem;
}

#account_popup
{
	position: absolute;
	top: 2.5rem;
	right: 0;
	transition: all 0.25s;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.25s;
}

.active#account_popup
{
	visibility: visible;
	opacity: 1;
}

#account_popup .content
{
	display: flex;
	flex-direction: column;
	font-size: 0.85rem;
	background: rgba(0, 0, 0, 0.95);
	margin-top: 1rem;
	width: 11rem;
}

#account_popup .content section
{
	padding: 0.25rem 0.5rem;
}

#account_popup .content .profile_item
{
	display: flex;
	align-items: center;
	padding: 0.25rem 0;
	margin: 0.25rem;
}

#account_popup section > *:hover
{
	text-decoration: underline;
}

#account_popup .content .profile_item .image_container
{
	width: 2rem;
	height: 2rem;
	margin-right: 0.5rem;
}

#account_popup .content section:not(:last-child)
{
	border-bottom: solid 1px rgba(255, 255, 255, 0.3);
}

#account_popup .content p
{
	margin: 0.5rem;
}

#account_popup #manage_profiles_button
{
	padding-top: 0.25rem;
}

</style>
