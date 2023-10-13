<script lang="ts">
	export let headline = "";
	export let maxWidth: string | undefined = undefined;

	let mw = maxWidth || undefined;
</script>

{#if headline}
	<div class="page-header">{headline}</div>
{/if}

<div class="page-container" style:max-width={mw}>
	<div class="page-content">
		<slot />
	</div>
</div>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.page-container {
		max-width: $content-width;
		margin: 0 auto;
	}

	.page-content {
		background-color: $white;
		border-radius: 6px;
		box-shadow: 0 0.5em 1em -0.125em rgba(34, 34, 34, 0.1),
			0 0px 0 1px rgba(34, 34, 34, 0.02);
		color: hsl(0, 0%, 29%);
		display: block;
		margin: 2rem;
		padding: 1.25rem;
	}

	.page-header {
		font-family: "Montserrat", serif;
		font-size: 2.5rem; //30px;
		text-align: center;
		color: $black-2;
		margin: 2rem 1rem 0;
	}

	@media screen and (max-width: $bp-small) {
		.page-content {
			border-radius: 4px;

			margin: 1rem;
			padding: 0.75rem;
		}
		.page-header {
			font-size: 1.75rem;
			margin: 1rem 1rem 0;
		}
	}
</style>
