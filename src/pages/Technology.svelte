<script lang="ts">
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="Technology Here">
	<div class="meter">
		<h2>We are ushering in a new era of</h2>
		<h2>DIGITAL DATA CONVERSION</h2>
		<div>
			<strong>DATA CONVERSION</strong> is the most critical function of modern
			communications and radar systems. Our fundamental breakthrough is the use
			of digital processing of analog signals using our novel technique known as
			<strong>TRAVELING PULSE WAVE QUANTIZATION</strong>
			resulting in <strong>DIGITAL DATA CONVERSION</strong>.
		</div>
	</div>
	<div class="tech-title">Traveling Pulse Wave Quantization (TPWQ)</div>
	<div class="tech-txt">
		Traveling Pulse Wave Quantization is a radical new approach to
		high-performance analog-to-digital conversion (ADC). With TPWQ, analog
		signals are first converted from a conventional voltage signal to the time
		domain in a voltage-to-time conversion (VTC) step. The time-domain analog
		signal is then converted to a digital value in a time-to-digital conversion
		(TDC) step using parallel digital processors employing self-calibrating
		machine-learning algorithms. The end result is DIGITAL DATA CONVERSION with
		unprecedented speed, efficiency, and scalability.
	</div>
	<div class="foot-message">
		DIGITAL DATA CONVERSION ENABLING THE DIGITAL REVOLUTION
	</div>
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.meter {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: $brand-secondary-3;
		min-height: 200px;
		padding: 1rem;
		background-image: url("/assets/img/meter-sm.jpg");
		background-color: transparent;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;

		> h2 {
			text-align: center;
		}

		> div {
			margin: 1rem 0;
			padding: 0 3rem;
		}
	}

	.tech-title {
		font-size: 1.15rem;
		font-weight: bold;
		margin: 1rem 0;
		padding: 0 3rem;
	}

	.tech-txt {
		margin: 1rem 0;
		padding: 0 3rem;
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
		.meter {
			display: block;
		}

		.tech-title {
			font-size: 1rem;
			font-weight: bold;
			margin: 0.75rem 0;
			padding: 0 1.5rem;
		}

		.tech-txt {
			margin: 0.75rem 0;
			padding: 0 1.5rem;
		}

		.foot-message {
			font-size: 1.2rem;
		}
	}
</style>
