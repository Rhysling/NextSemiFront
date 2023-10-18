<script lang="ts">
	import { navTo } from "../stores/route-store";
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="NXT-SDX: Software-Defined Radio / Radar / Optical">
	<div class="panels">
		<div class="item center">
			<div>
				<ul>
					<li>radar (machine vision)</li>
					<li>comm waveform analysis</li>
					<li>spectrum analysis</li>
				</ul>
			</div>
			<img src="./assets/img/phased-array-panel.png" alt="Phased Array Panel" />
		</div>
		<div class="item center">
			<img src="./assets/img/sdx-flow.png" alt="SDX Flow" />
		</div>
	</div>
	<div class="center">
		<img src="./assets/img/complete-solution.png" alt="Complete Solution" />
	</div>
</MainContainer>

<div class="g-nxt-pagenav">
	<div class="g-nxt-l">
		<a href="/" on:click={(e) => navTo(e, "/")}>&lt; Home</a>
	</div>
	<div class="g-nxt-c">|</div>
	<div class="g-nxt-r">
		<a href="/" on:click={(e) => navTo(e, "/system-on-chip")}>NXT-SoC &gt;</a>
	</div>
</div>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.panels {
		display: flex;
		flex-direction: row;

		.item {
			flex: 1 1 50%;
			padding: 1rem;
		}
	}

	.center {
		> div,
		> img {
			margin: 0 auto;
		}
	}
</style>
