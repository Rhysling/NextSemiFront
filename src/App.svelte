<script lang="ts">
	import { onMount } from "svelte";

	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";

	import Home from "./pages/Home.svelte";
	import Converters from "./pages/Converters.svelte";
	import SpecialtyIP from "./pages/SpecialtyIP.svelte";
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
		Converters,
		SpecialtyIP,
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
