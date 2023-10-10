<script>
	import { routes, navTo } from "../stores/route-store";

	export let isFooter = false;

	let topRoutes = $routes.children || [];
	let bottomRoutes = [$routes, ...topRoutes];
	let iLast = bottomRoutes.length - 1;

	let isActive = false;

	let toggleActive = function () {
		isActive = !isActive;
	};

	let setActiveFalse = function () {
		isActive = false;
	};
</script>

{#if isFooter}
	<div class="bottom-nav">
		{#each bottomRoutes as route, i}
			<a href="/" on:click|preventDefault={() => navTo(null, route.path)}
				>{route.title}</a
			>
			{#if i < iLast}&nbsp;&nbsp;|&nbsp;&nbsp;{/if}
		{/each}
	</div>
{:else}
	<nav class="container navbar" aria-label="main navigation">
		<div class="navbar-brand">
			<a
				href="/"
				on:click|preventDefault={() => navTo(null, "/")}
				class="navbar-item"
				on:click|preventDefault={setActiveFalse}
			>
				<img
					src="/img/arc-logo-sm.png"
					width="113"
					height="30"
					alt="ADD LOGO"
				/>
			</a>

			<button
				class="navbar-burger burger"
				class:is-active={isActive}
				aria-label="menu"
				aria-expanded="false"
				on:click|preventDefault={toggleActive}
			>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</button>
		</div>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="navbar-menu"
			class:is-active={isActive}
			on:click|preventDefault={setActiveFalse}
			aria-controls="menu"
		>
			<div class="navbar-start" aria-controls="menu">
				{#each topRoutes as r}
					{#if r.children && r.children.length}
						<div class="navbar-item has-dropdown is-hoverable">
							<a
								href="/"
								on:click|preventDefault={() => navTo(null, r.path)}
								class="navbar-link"
							>
								{r.title}
							</a>
							<div class="navbar-dropdown" aria-controls="menu">
								{#each r.children as c}
									<a
										href="/"
										on:click|preventDefault={() => navTo(null, c.path)}
										class="navbar-item"
									>
										{c.title}
									</a>
								{/each}
							</div>
						</div>
					{:else}
						<a
							href="/"
							on:click|preventDefault={() => navTo(null, r.path)}
							class="navbar-item"
						>
							{r.title}
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</nav>
{/if}

<style type="text/scss">
	.navbar a {
		color: #326297;

		&:hover {
			color: darken(#326297, 20%);
		}
	}

	.bottom-nav a {
		color: #eeeeee;
	}
</style>
