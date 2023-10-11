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
	main {
		width: 100%;
		min-height: 100vh;
	}
</style>
