<script>
export default {
	name: "FilmPreview",
	props: ["film"],
	methods:
	{
		closePreview()
		{
			this.$emit('close');
		}
	}
}
</script>

<template>
	<div class="film_preview">
		<header>
			<div class="button" id="close_button" @click="closePreview">
				<svg viewBox="0 0 24 24">
					<path fill="currentColor" d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z"></path>
				</svg>
			</div>
			<div class="image_container">
				<img :src="film.overview_img"/>
				<div class="mask"></div>
			</div>
			<div class="buttons_container">
				<div class="left">
					<router-link :to="{name: 'watch', params: {id: film.id}}">
						<div class="button" id="play_button">
							<svg viewBox="0 0 24 24">
								<path fill="currentColor" d="M6 4l15 8-15 8z"></path>
							</svg>
							Play
						</div>
					</router-link>
					<div class="button" id="like_button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"></path>
						</svg>
					</div>
					<div class="button" id="unlike_button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"></path>
						</svg>
					</div>
				</div>
				<div class="right">
					<div class="button">
						<svg viewBox="0 0 24 24">
							<path fill="currentColor" d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm6-10.414l3.293-3.293 1.414 1.414L18.414 12l3.293 3.293-1.414 1.414L17 13.414l-3.293 3.293-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L17 10.586z"></path>
						</svg>
					</div>
				</div>
			</div>
		</header>
		<div class="details">
			<div class="left">
				<div class="metadata">
					<span class="score_match">97% recommended</span>
					<span class="date">2005 </span>
					<span class="age_limit">16+ </span>
					<span class="duration">2 hrs </span>
					<span class="quality">HD </span>
				</div>
				<p class="synopsys">{{ film.synopsys }}</p>
			</div>
			<div class="right">
				<p>
					<span class="name">Cast</span> : 
					<span class="value">Brad Pitt, Angelina Jolie</span>
				</p>
				<p>
					<span class="name">Genres</span> : 
					<span class="value">Action movies, Comedies</span>
				</p>
				<p>
					<span class="name">This movie is</span> : 
					<span class="value">Suspenseful, exciting</span>
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>

.film_preview
{
	position: fixed;
	top: 2rem;
	left: 20vw;
	width: 60vw;
	z-index: 999;
	background: #181818;
}

@media screen and (max-width: 850px)
{
	.film_preview
	{
		width: 80vw;
		left: 10vw;
	}
}

@media screen and (max-width: 850px)
{
	.film_preview
	{
		width: 95vw;
		left: 2.5vw;
	}
}

header
{
	position: relative;
	background: linear-gradient(to top ,#181818,transparent 50%);
}

.image_container
{
	width: 100%;
}

.image_container .mask
{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
    background: linear-gradient(to top,#181818,transparent);
}

img
{
	width: 100%;
}

.buttons_container
{
	display: flex;
	justify-content: space-between;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 1rem 2rem;
}

.buttons_container > div
{
	display: flex;
}

.button
{
	display: flex;
    align-items: center;
	justify-content: center;
	padding: 0.375rem;
    width: 2.125rem;
	height: 2.125rem;
    cursor: pointer;
    transition: all 0.25s;
    margin: 1rem 0.25rem;
    font-weight: bold;
	border: solid 2px rgba(255,255,255,.5);
    border-radius: 100%;
	background: rgba(42, 42, 42, 0.6);
}

.button:hover
{
	border-color: white;
}

#play_button
{
	background-color: white;
	width: auto;
	padding: 0.4rem 1rem;
    color: black;
    margin-left: 0;
	border-radius: 0.125rem;
}

#play_button svg
{
	width: 1rem;
}

.button svg
{
	width: 100%;
}

#play_button svg
{
	margin-right: 0.5rem;
}

#close_button
{
	position: absolute;
	top: 0;
	right: 1rem;
	cursor: pointer;
	z-index: 1;
}

.details
{
	display: grid;
	grid-template-columns: minmax(0,2fr) minmax(0,1fr);
	column-gap: 2em;
	padding: 1rem 2rem;
}

.details .synopsys
{
	font-size: 1.125rem;
}

.details .right
{
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
}

.details .right p
{
	margin: 0.5rem;
}

.details .name
{
	color: grey;
}

.details .metadata > span
{
	font-size: 1.125rem;
	display: inline-block;
	margin: 0 0.25rem;
}

.details .score_match
{
	color: #46d369;
	font-weight: bold;
}

.details .age_limit
{
	border: solid 1px white;
	padding: 0 0.25rem;
}

</style>