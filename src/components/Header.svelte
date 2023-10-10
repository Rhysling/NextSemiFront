<script lang="ts">
	import { currentRoute } from "../stores/route-store";
	import Headroom from "./Headroom.svelte"; // Thanks to "svelte-headroom"
	import Nav from "./Nav.svelte";

	// import {
	//   isVideoDisplayed,
	//   toggleVideoDisplayed
	// } from "../stores/general-store.js";

	//export let path: string = null;
</script>

{#if $currentRoute}
	<Headroom offset={50}>
		<div class="arc-nav">
			<Nav isFooter={false} />
		</div>
	</Headroom>
	{#if $currentRoute.path === "/"}
		<div class="logo">
			<img src="/img/arc-logo4.png" alt="American Research Capital" />
		</div>
		<div class="head">
			<img src="/img/arc-head.jpg" alt="" />
		</div>
		<div class="subhead">Financing Designed for Research</div>
	{:else}
		<div class="head2">
			<img src="/img/arc-head4.jpg" alt="" />
		</div>
	{/if}
{/if}

<style lang="scss">
	@import "../styles/_custom-variables.scss";
	//@import "../../node_modules/bulma/sass/utilities/_all.sass";

	.logo {
		margin: 60px 0 0;
		//width: 100%;

		img {
			display: block;
			margin: 0 auto;
			padding: 0 0.5rem;
			max-height: 150px;
			width: auto;
		}
	}

	.arc-nav {
		margin: 0;
		width: 100%;
		background-color: #fff;
	}

	.head {
		position: relative;
		margin: 0;
		width: 100%;
		background-image: url("/img/arc-head-bg.jpg");

		img {
			display: block;
			margin: 0 auto;
			height: auto;
			width: auto;
		}
	}

	.head2 {
		margin: 60px 0 0;
		width: 100%;
		background-image: url("/img/arc-head4-bg.jpg");

		img {
			display: block;
			margin: 0 auto;
			height: auto;
			width: auto;
		}
	}

	.subhead {
		width: 100%;
		font-family: "Montserrat", serif;
		font-size: 2.5rem; //30px;
		text-align: center;
		color: white;
		background-color: #0174b7;
		padding: 4px;

		@media screen and (max-width: $desktop) {
			font-size: 1.5rem;
		}
	}
</style>
