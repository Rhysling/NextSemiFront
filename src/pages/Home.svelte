<script lang="ts">
	import MainContainer from "../components/MainContainer.svelte";
</script>

<MainContainer headline="">
	<h1>This is the home page.</h1>
	<p><a href="/">This is a link</a> with more text.</p>
	<p>To Come</p>
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	h1 {
		margin-top: 3rem;
		text-align: center;
		font-size: 4rem;
	}

	p {
		padding: 3rem 2rem;
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
