<template>
	<div class="container-fluid">
		<img src="../../assets/img/foot.jpg">
		<p> Copyright © 2018 心灵之家 版权所有</p>
	</div>
</template>

<script>
	export default {
		name: 'foot'
	}
</script>

<style scoped>
	div.container-fluid {
		bottom: 0px;
		height: 10rem;
		width: 100%;
    padding-bottom: 20px;
    background: url(../../assets/img/little-foot.jpg) 50% 50%;
   /* background: rgba(237,227,135, 0.8);*/
	}
	div.container-fluid img {
    border-radius: 48%;
		width: 6%;
		margin: 1.1em auto;
	}
	div.container-fluid p {
		color: white;
	}
</style>
