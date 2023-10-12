<script lang="ts">
	import { onMount } from "svelte";

	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";

	import Home from "./pages/Home.svelte";
	import SoftwareDefinedRadio from "./pages/SoftwareDefinedRadio.svelte";
	import SystemOnChip from "./pages/SystemOnChip.svelte";
	import IntellectualProperty from "./pages/IntellectualProperty.svelte";
	import Technology from "./pages/Technology.svelte";
	import About from "./pages/About.svelte";
	import Contact from "./pages/Contact.svelte";

	import { currentRoute, navFromUrl } from "./stores/route-store.js";

	let path = "/";
	let page = "Home";

	onMount(() => {
		navFromUrl();
	});

	let pages: any = {
		Home,
		SoftwareDefinedRadio,
		SystemOnChip,
		IntellectualProperty,
		Technology,
		About,
		Contact,
	};

	$: {
		path = $currentRoute.path;
		page = $currentRoute?.page ?? "Home";

		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}
</script>

<main>
	<Header />
	<div class="g-page">
		<svelte:component this={pages[page]} />
	</div>
	<Footer />
</main>

<style lang="scss">
	@import "styles/_custom-variables.scss";

	main {
		background-color: $bg-light;
	}
</style>
