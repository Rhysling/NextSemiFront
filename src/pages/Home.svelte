<script lang="ts">
	import { navTo } from "../stores/route-store";
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="">
	<div class="nxt-links">
		<a href="/" on:click={(e) => navTo(e, "/software-defined-radio")}
			>NXT-SDX: Software-Defined Radio / Radar / Optical</a
		>

		<a href="/" on:click={(e) => navTo(e, "/system-on-chip")}
			>NXT-SoC: System-on-Chip Platform</a
		>

		<a href="/" on:click={(e) => navTo(e, "/intellectual-property")}
			>NXT-IP: Intellectual Property Cores</a
		>
	</div>
</MainContainer>

<div class="g-nxt-pagenav">
	<div class="g-nxt-l">&nbsp;</div>
	<div class="g-nxt-c">|</div>
	<div class="g-nxt-r">
		<a href="/" on:click={(e) => navTo(e, "/software-defined-radio")}
			>NXT-SDX &gt;</a
		>
	</div>
</div>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.nxt-links {
		display: flex;
		flex-direction: column;

		a {
			font-size: 1.5rem;
			padding: 1rem 1rem 1rem 3rem;
		}
	}
</style>
