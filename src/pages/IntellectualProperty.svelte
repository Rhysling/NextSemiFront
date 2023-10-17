<script lang="ts">
	import { httpClient as ax } from "../stores/httpclient-store";
	import { ipList } from "../stores/iplist-store.js";
	import MainContainer from "../components/MainContainer.svelte";

	const getItems = async () => {
		let res = await $ax.get<IpItem[]>("/api/IpItems");
		ipList.set(res.data);
	};

	if (!$ipList.length) {
		getItems();
	}

	let adc: IpItem[];
	let dac: IpItem[];
	let pll: IpItem[];

	const sortIp = (a: IpItem, b: IpItem) => {
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;
		return 0;
	};

	$: {
		adc = $ipList.filter((a) => a.category.startsWith("ADC")).sort(sortIp);
		dac = $ipList.filter((a) => a.category.startsWith("DAC")).sort(sortIp);
		pll = $ipList
			.map((a) => {
				a.speed = a.speed.replace(" MAX FOUT", "");
				return a;
			})
			.filter((a) => a.category.startsWith("PLL"))
			.sort(sortIp);
	}
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

	<div>
		NEXT offers custom Intellectual Property (IP) cores for use in customer SoCs
		and has &gt;15 years of experience supporting high volume production.
	</div>

	<div class="ip-list">
		<div class="ip-title">ADC IP CORES</div>
		<div class="ip-title">Resolution</div>
		<div class="ip-title">Speed</div>
		<div class="ip-title">Technology</div>
		{#each adc as a}
			<div>{a.name}</div>
			<div>{a.resolution}</div>
			<div>{a.speed}</div>
			<div>{a.technology}</div>
		{/each}
	</div>

	<div class="ip-list">
		<div class="ip-title">DAC IP CORES</div>
		<div class="ip-title">Resolution</div>
		<div class="ip-title">Speed</div>
		<div class="ip-title">Technology</div>
		{#each dac as a}
			<div>{a.name}</div>
			<div>{a.resolution}</div>
			<div>{a.speed}</div>
			<div>{a.technology}</div>
		{/each}
	</div>

	<div class="ip-list-pll">
		<div class="ip-title">PLL IP CORES</div>
		<div class="ip-title">MAX FOUT</div>
		<div class="ip-title">Technology</div>
		{#each pll as a}
			<div>{a.name}</div>
			<div>{a.speed}</div>
			<div>{a.technology}</div>
		{/each}
	</div>
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	ul {
		margin: 2rem;
		line-height: 200%;
	}

	.ip-title {
		font-weight: bold;
	}

	.ip-list {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		max-width: 600px;
		margin: 1rem;
		border: 2px solid $bg-dark;

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

	.ip-list-pll {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		max-width: 400px;
		margin: 1rem;
		border: 2px solid $bg-dark;

		div {
			font-size: 0.9rem;
			padding: 0.2rem;
		}

		> div:nth-child(6n + 1),
		> div:nth-child(6n + 2),
		> div:nth-child(6n + 3) {
			background: #eeeeee;
		}
	}
</style>
