<script>
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
		}
	},
	methods:
	{
		expand_search()
		{
			this.search_expanded = true;
		},

		scroll_handler(event)
		{
			if (window.scrollY > 0)
				this.opaque = true;
			else
				this.opaque = false;
		}
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
		<div class="links_container">
			<router-link :to="{name: 'browse_index'}">Home</router-link>
			<router-link :to="{name: 'browse_watch_again'}">Review</router-link>
			<router-link to="">Series</router-link>
			<router-link to="">Movies</router-link>
			<router-link to="">Most viewed</router-link>
		</div>
		<div class="tool_nav">
			<div id="search_button" class="icon button" :class="{active: search_expanded}" @click="expand_search">
				<label for="search"></label>
				<input type="text" id="search" placeholder="Title, people, genres..."/>
			</div>
			<div id="notification_button" class="icon button"></div>
			<div id="account_button" class="button">
				<router-link to="/account">
					<div class="profile_img_container">
						<img :src="$store.state.account.profile.img"/>
					</div>
				</router-link>
			</div>
		</div>
	</header>
</template>

<style>

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

.links_container
{
	display: flex;
	align-items: center;
}

.links_container a
{
	margin: 0rem 1rem;
	font-size: 0.9rem;
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
	margin: 0;
}

.profile_img_container
{
	width: 2.5rem;
	height: 2.5rem;
}

</style>
