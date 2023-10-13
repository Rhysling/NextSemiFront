<script lang="ts">
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="NXT-IP: Intellectual Property Cores">
	<ul>
		<li>ADC (Analog to Digital Converters)</li>
		<li>DAC (Digital to Analog Converters)</li>
		<li>PLL (Phase Lock Loop Clock Generators)</li>
		<li>
			AFE Macros (AFE = Analog Front End, does not include DSP processing)
		</li>
		<li>DTRX Macros (DTRX = Digital Transceiver, includes DSP processing)</li>
	</ul>
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	ul {
		margin: 2rem;
		line-height: 200%;
	}

	// .logo {
	// 	height: 6em;
	// 	padding: 1.5em;
	// 	will-change: filter;
	// 	transition: filter 300ms;

	// 	&:hover {
	// 		filter: drop-shadow(0 0 2em #646cffaa);
	// 	}

	// 	&.svelte:hover {
	// 		filter: drop-shadow(0 0 2em #ff3e00aa);
	// 	}
	// }

	// .read-the-docs {
	// 	color: #888;
	// }
</style>
