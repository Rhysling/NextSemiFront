<script lang="ts">
	import { navTo } from "../stores/route-store";
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="About NEXT Semiconductor">
	<div class="panels">
		<div class="item headline">
			Data Conversion is at the heart of every real world interface, connecting
			analog to digital and digital to analog, enabling the digital revolution.
		</div>
		<div class="item">
			Founded in 2023 by industry veterans who previously held management and
			technical leadership roles at Broadcom, Qualcomm, NXP and IQ-Analog, NEXT
			Semiconductor is a privately held corporation focused on the development
			of software-defined radio and radar systems with semiconductor-level
			differentiation leveraging our unique <strong
				>DIGITAL DATA CONVERSION</strong
			> technology.
		</div>
	</div>
	<div class="foot-message">
		DIGITAL DATA CONVERSION ENABLING THE DIGITAL REVOLUTION
	</div>
</MainContainer>

<div class="g-nxt-pagenav">
	<div class="g-nxt-l">
		<a href="/" on:click={(e) => navTo(e, "/technology")}>&lt; Technology</a>
	</div>
	<div class="g-nxt-c">|</div>
	<div class="g-nxt-r">
		<a href="/" on:click={(e) => navTo(e, "/contact-us")}>Contact &gt;</a>
	</div>
</div>

<style lang="scss">
	@import "../styles/_custom-variables.scss";
	.panels {
		display: flex;

		.item {
			flex: 1 1 50%;
			padding: 1rem;
		}
	}

	.headline {
		font-size: 1.2rem;
		font-weight: bold;
	}

	.foot-message {
		background-color: $brand-primary-1;
		padding: 1rem;
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
		text-wrap: balance;
	}

	@media screen and (max-width: $bp-small) {
		.panels {
			display: block;
		}

		.headline {
			font-size: 1.1rem;
		}

		.foot-message {
			font-size: 1.2rem;
		}
	}
</style>
