<script>

import Header from '@/components/Header';
import SvgLib from '../components/SvgLib.vue';

export default {
	name: "Browse",
	components:
	{
		Header,
		SvgLib,
	}
}
</script>

<template>
	<div class="browse">
		<router-view></router-view>
		<SvgLib/>
	</div>
</template>

<style scoped>

.browse
{
	overflow: hidden;
}

</style>
