<script>
export default {
	name: "FilmPreview",
	props:
	{
		film:
		{
			type: Object,
			required: true
		},
	},
	methods:
	{
		hide()
		{
			this.$emit('hide');
		}
	}
}
</script>

<template>
	<div class="film_preview" @mouseleave="hide">
		<router-link :to="{name: 'watch', params: {id: film.id}}" class="image_container">
			<img :src="film.overview_img"/>
		</router-link>
		<div class="text_container">
			<div class="buttons_container">
				<div class="left">
					<div class="button play_button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M6 4l15 8-15 8z"></path>
						</svg>
					</div>
					<div class="button add_to_list_button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"></path>
						</svg>
					</div>
					<div class="button like_button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"></path>
						</svg>
					</div>
					<div class="button unlike_button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"></path>
						</svg>
					</div>
				</div>
				<div class="button info_button">
					<svg viewBox="0 0 24 24">
						<path fill="currentColor" d="M5.689 7.924L4.387 9.442 12.038 16l7.651-6.558-1.302-1.518-6.349 5.442z"></path>
					</svg>
				</div>
			</div>
			<div class="indicator">
				Nouveau
			</div>
			<div class="tags_container">
				<div class="tag" v-for="(tag, index) in film.tags" :key="index">
					{{ tag }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.film_preview
{
	position: absolute;
	top: 0;
	left: 0;
	width: 34vw;
	height: 35vw;
	transform: translateY(-25%);
	visibility: hidden;
	opacity: 0;
	background: #141414;
	z-index: 2;
	transition: all 0.5s;
	cursor: pointer;
	animation: show 0.5s ease-out forwards;
}

.film_preview.show
{
	opacity: 1;
	visibility: visible;
}

.image_container
{
	display: block;
}

.indicator
{
	font-size: 1.1rem;
	font-weight: bold;
	color: #46d369;
	margin: 0.125rem 0;
}

.buttons_container
{
	display: flex;
	justify-content: space-between;
	margin: 0.75rem 0;
}

.buttons_container .left
{
	display: flex;
}

.button
{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2rem;
	height: 2rem;
	border-radius: 100%;
	margin: 0 0.25rem;
	border: solid 1px rgba(255, 255, 255, 0.5);
	background-color: rgba(42, 42, 42, 0.6);
	transition: all 0.125s;
}

.button:hover
{
	border-color: white;
}

.button svg
{
	display: block;
	width: 1rem;
	height: 1rem;
}

.button.play_button
{
	background-color: white;
	color: #141414;
}

.button.play_button:hover
{
	background-color: rgba(255, 255, 255, 0.875);
}

.text_container
{
	padding: 0rem 1rem;
}

.tags_container
{
	display: flex;
	flex-wrap: wrap;
}

.tag
{
	margin: 0 0.25rem;
}

.tag:before
{
	content: '\2022';
	padding: 0 0.25rem;
	color: rgba(255, 255, 255, 0.5);
}

.button:first-child,
.tag:first-child
{
	margin-left: 0;
}

@keyframes show
{
	from
	{
		width: 25%;
		opacity: 0;
	}
	to
	{
		width: 34vw;
		height: 35vw;
		opacity: 1;
	}
}

</style>
