<script lang="ts">
	import { navTo } from "../stores/route-store";
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="NXT-SoC: System-on-Chip Platform">
	<p>The NX1 SoC platform for next generation wideband SDX systems</p>
	<p>
		Work with us to define your next SoC or on-ramp to our active developments
		with your specific digital processing needs.
	</p>

	<div class="tbl">
		<div class="tbl-title">ADC/DAC<br />Option</div>
		<div class="tbl-title">Resolution<br />(bits)</div>
		<div class="tbl-title">Sample Rate<br />(GS/s)</div>
		<div class="tbl-title">SNR/MHz<br />(dB)</div>

		<div>WB<br /><span class="sm">Wide-band</span></div>
		<div>10</div>
		<div>12-48</div>
		<div>85</div>

		<div>MB<br /><span class="sm">Mid-band</span></div>
		<div>12</div>
		<div>3-12</div>
		<div>94</div>

		<div>LB<br /><span class="sm">Low-band</span></div>
		<div>14</div>
		<div>1-3</div>
		<div>97</div>

		<div>NB<br /><span class="sm">Narrow-band</span></div>
		<div>16</div>
		<div>0.2-1.0</div>
		<div>100</div>
	</div>
</MainContainer>

<div class="g-nxt-pagenav">
	<div class="g-nxt-l">
		<a href="/" on:click={(e) => navTo(e, "/software-defined-radio")}
			>&lt; NXT-SDX</a
		>
	</div>
	<div class="g-nxt-c">|</div>
	<div class="g-nxt-r">
		<a href="/" on:click={(e) => navTo(e, "/intellectual-property")}
			>NXT-IP &gt;</a
		>
	</div>
</div>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.tbl-title {
		font-weight: bold;
	}

	.sm {
		font-size: 0.7em;
	}

	.tbl {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		max-width: 600px;
		margin: 1rem;
		border: 2px solid $bg-dark;
		text-align: center;

		div {
			font-size: 0.9rem;
			padding: 0.2rem;
		}

		> div:nth-child(8n + 1),
		> div:nth-child(8n + 2),
		> div:nth-child(8n + 3),
		> div:nth-child(8n + 4) {
			background: #eeeeee;
		}
	}

	p {
		padding: 1.5rem 2rem;
	}
</style>
