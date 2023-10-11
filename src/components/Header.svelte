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
		<div class="nav-wrap">
			<div class="nav-container">
				<div class="arc-nav">
					<Nav isFooter={false} />
				</div>
			</div>
		</div>
	</Headroom>
	{#if $currentRoute.path === "/"}
		<div class="logo">
			<img src="./assets/img/logo-med.png" alt="NEXT Semiconductor" />
		</div>

		<div class="subhead">Tomorrow's Technology Today</div>
	{:else}
		<div class="head2">
			<img src="./assets/img/horizon2.png" alt="" />
		</div>
	{/if}
{/if}

<style lang="scss">
	@import "../styles/_custom-variables.scss";
	//@import "../../node_modules/bulma/sass/utilities/_all.sass";

	.nav-wrap {
		width: 100%;
		background-color: $white;
	}
	.nav-container {
		max-width: $content-width;
		margin: 0 auto;
	}

	.logo {
		margin: 3rem 0;
		//width: 100%;

		img {
			display: block;
			margin: 0 auto;
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
		//background-image: url("/img/arc-head-bg.jpg");
		background-color: $bg-dark;

		img {
			display: block;
			margin: 0 auto;
			height: auto;
			width: 100%;
			overflow: hidden;
		}
	}

	.head2 {
		margin: 0;
		width: 100%;

		//background-image: url("/img/arc-head4-bg.jpg");
		background-color: $bg-dark;

		img {
			display: block;
			margin: 0 auto;
			height: auto;
			width: 100%;
			overflow: hidden;
		}
	}

	.subhead {
		width: 100%;
		font-family: "Montserrat", serif;
		font-size: 2.5rem; //30px;
		text-align: center;
		color: $white-2;
		background-color: $brand-primary;
		padding: 4px;

		@media screen and (max-width: $desktop) {
			font-size: 1.5rem;
		}
	}
</style>
