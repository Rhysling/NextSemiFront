<script lang="ts">
	import { onMount } from "svelte";

	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";

	import Home from "./pages/Home.svelte";
	import StoreDemo from "./pages/StoreDemo.svelte";

	import { currentRoute, navFromUrl } from "./stores/route-store.js";

	let path = "/";
	let page = "Home";

	onMount(() => {
		navFromUrl();
	});

	let pages: any = {
		Home,
		StoreDemo,
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
	<svelte:component this={pages[page]} />
	<Footer />
</main>

<style lang="scss">
	@import "./styles/_custom-variables.scss";

	main {
		background-color: #fff;
		min-width: 500px;
		max-width: 800px;
		margin: 1rem auto;
		padding: 1em;
	}

	@media only screen and (max-width: $bp-small) {
	}
</style>
