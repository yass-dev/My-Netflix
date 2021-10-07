<script>
export default {
	name: "BillboardPresentation",
	props: ["film"],
}
</script>

<template>
	<div class="billboard_presentation">
		<div class="billboard">
			<div class="image_container">
				<img :src="film.overview_img"/>
				<div class="image_mask"></div>
				<div class="bottom_mask"></div>
			</div>
			<div class="info">
				<div class="synopsys">
					{{ film.synopsys }}
				</div>
				<div class="buttons_container">
					<div class="play_button">
						<svg viewBox="0 0 24 24"><path d="M6 4l15 8-15 8z" fill="currentColor"></path></svg>
						Play
					</div>
					<div class="info_button">
						<svg viewBox="0 0 24 24"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z" fill="currentColor"></path></svg>
						More infos
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.billboard_presentation
{
	position: relative;
	padding-bottom: 40%;
	background: grey;
}

.billboard
{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 56.25vw;
}

.image_container
{
	z-index: 0;
	width: 100%;
}

img
{
	width: 100%;
}

.image_mask
{
	position: absolute;
    top: 0;
    left: 0;
    right: 26.09%;
    bottom: 0;
    opacity: 1;
	background:linear-gradient(77deg,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 85%);
	z-index: 1;
}

.info
{
	position: absolute;
	bottom: 35%;
	left: 5%;
	width: 35%;
	color: white;
	z-index: 1;
	display: flex;
	flex-direction: column;
}

.synopsys
{
	font-weight: bold;
	font-size: 1.4vw;
	text-align: left;
}

.buttons_container
{
	display: flex;
}

.buttons_container > *
{
	display: flex;
	align-items: center;
	padding: 0.4rem 1rem;
	border: solid 1px transparent;
	cursor: pointer;
	transition: all 0.25s;
	margin: 1rem 0.5rem;
	font-weight: bold;
	border-radius: 0.25rem;
}

.buttons_container > * > svg
{
	width: 1.25rem;
	margin-right: 0.5rem;
}

.play_button
{
	background-color: white;
	color: black;
	margin-left: 0;
}

.play_button:hover
{
	background-color: rgba(255, 255, 255, 0.75);
}

.info_button
{
	background-color: rgba(109,109,110, 0.7);
}

.info_button:hover
{
	background-color: rgba(109,109,110,0.4);
}


.bottom_mask
{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 14.7vw;
	background: linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);
	z-index: 1;
}

</style>