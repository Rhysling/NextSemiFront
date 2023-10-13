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
				<div class="nav">
					<Nav isFooter={false} />
				</div>
			</div>
		</div>
	</Headroom>
	{#if $currentRoute.path === "/"}
		<!-- <div class="logo">
			<img src="./assets/img/logo-med.png" alt="NEXT Semiconductor" />
		</div> -->

		<div class="logo-reverse">
			<img src="./assets/img/logo-med-reverse.png" alt="NEXT Semiconductor" />
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

	.logo-reverse {
		padding: 2rem 0;

		background: radial-gradient(
			1600px 400px at 50% 120%,
			yellow 10%,
			$brand-primary 25%,
			$black 60%
		);

		img {
			display: block;
			margin: 0 auto;
		}
	}

	.nav {
		margin: 0;
		width: 100%;
		background-color: #fff;
	}

	.head2 {
		margin: 0;
		width: 100%;
		background-color: $bg-dark;

		img {
			display: block;
			margin: 0 auto;
			height: auto;
			width: clamp(800px, 100%, 1000px);
			max-width: unset;
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
	}

	@media screen and (max-width: $bp-small) {
		.logo-reverse {
			padding: 1rem 0;

			background: radial-gradient(
				1600px 400px at 50% 130%,
				yellow 8%,
				$brand-primary 15%,
				$black 40%
			);

			img {
				display: block;
				max-width: 45vw;
				margin: 0 auto;
			}
		}

		.subhead {
			font-size: 2rem;
		}
	}
</style>
