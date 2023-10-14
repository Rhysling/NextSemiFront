<script lang="ts">
	import { routes, navTo, currentPath } from "../stores/route-store";

	export let isFooter = false;

	let routeLastIndex = 0;
	let primaryRoutes: Route[] = [];

	$: {
		primaryRoutes = $routes.children?.filter((a) => !a.isHidden) || [];
		routeLastIndex = primaryRoutes.length - 1;
	}

	let isOpenRoot = false;

	let setOpenRoot = (val: boolean) => {
		isOpenRoot = val;
		toggleOpenDropdown("");
	};

	let toggleOpenDropdown = (pathName: string, setOpen?: boolean) => {
		// let r = allRoutes.find(a => a.slug == slug);
		// if (r) r.isExpanded = !r.isExpanded;
		for (let r of primaryRoutes) {
			if (r.path == pathName) {
				r.isExpanded = setOpen === undefined ? !r.isExpanded : setOpen;
			} else {
				r.isExpanded = false;
			}
		}

		primaryRoutes = primaryRoutes;
	};

	const nav = (e: MouseEvent, path: string) => {
		e.stopPropagation();

		primaryRoutes = primaryRoutes.map((a) => {
			if (a.children && a.children.length) {
				a.hasSelectedChild = a.children.some((c) => c.path === path);
				return a;
			}

			a.hasSelectedChild = false;
			return a;
		});

		navTo(e, path);
		setOpenRoot(false);
	};
</script>

{#if isFooter}
	<div class="bottom-nav">
		<a href="/" on:click={(e) => nav(e, "/")}>Home</a>&nbsp;&nbsp;|&nbsp;&nbsp;
		{#each primaryRoutes as route, i}
			<a
				href="/"
				on:click={(e) => {
					nav(
						e,
						route.children && route.children.length
							? route.children[0].path
							: route.path
					);
				}}>{route.title}</a
			>
			{#if i < routeLastIndex}&nbsp;&nbsp;|&nbsp;&nbsp;{/if}
		{/each}
	</div>
{:else}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="nav-vertical" class:open={isOpenRoot ? true : undefined}>
		<div class="toggle-bar">
			<div
				class="nav-toggle"
				on:mouseenter={() => setOpenRoot(true)}
				on:click|stopPropagation={() => setOpenRoot(!isOpenRoot)}
			>
				<i class="fa-solid fa-bars" style="font-size:1.75rem;padding:0.3rem;" />
			</div>
			<div class="toggle-bar-logo">
				<a href="/" on:click={(e) => nav(e, "/")}>
					<img src="/assets/img/logo-sm.png" alt="Home" /></a
				>
			</div>
		</div>
		<nav>
			<a class="home show-horizontal" href="/" on:click={(e) => nav(e, "/")}>
				<img src="/assets/img/logo-sm.png" alt="Home" /></a
			>
			<a
				class="home menu-item show-vertical"
				href="/"
				on:click={(e) => nav(e, "/")}
			>
				Home</a
			>

			{#each primaryRoutes as r}
				{#if r.children && r.children.length}
					<a
						href="/"
						on:click|preventDefault|stopPropagation={() =>
							toggleOpenDropdown(r.path)}
						on:mouseenter={() => toggleOpenDropdown(r.path, true)}
						on:mouseleave={() => toggleOpenDropdown(r.path, false)}
						class="dropdown menu-item"
						class:open={r.isExpanded ? true : undefined}
						class:has-selected-child={r.hasSelectedChild}
					>
						<span
							>{r.page}
							<i
								class="fa-solid"
								class:fa-angle-down={!r.isExpanded}
								class:fa-angle-up={r.isExpanded}
							/></span
						>
						<div class="dropdown-content">
							{#each r.children.filter((a) => !a.isHidden) as c}
								<a
									href="/"
									on:click={(e) => nav(e, c.path)}
									class="menu-item"
									class:selected={c.path === $currentPath}
									>{c.navName || c.page}</a
								>
							{/each}
						</div>
					</a>
				{:else}
					<a
						href="/"
						class="menu-item"
						on:click={(e) => nav(e, r.path)}
						class:selected={r.path === $currentPath}>{r.navName || r.page}</a
					>
				{/if}
			{/each}
		</nav>
	</div>
{/if}

<svelte:body on:click={() => setOpenRoot(false)} />

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	nav {
		display: flex;
		gap: 1em;
		align-items: center;
		justify-content: space-between;
		background-color: $nav-bg-color;
		padding: 0 0.5rem;
	}

	.menu-item {
		display: block;
		box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		padding: 0.5em;
		margin: 0.5em 0;
	}

	.show-horizontal {
		display: block !important;
	}

	.show-vertical {
		display: none !important;
	}

	.home {
		flex-grow: 1;
		padding: 0;
		margin: 0;

		img {
			display: inline-block;
			width: 109px;
			height: 30px;
		}
	}

	a,
	a:visited {
		color: $brand-primary;
		text-decoration: none;
	}

	a:hover {
		//color: darken($brand-primary, 5%);
		color: $brand-primary-3;
		background-color: darken($nav-bg-color, 5%);
	}

	a.has-selected-child {
		// background-color: lighten($brand-primary, 30%);
		//background-color: rgb(245, 182, 42);
		background-color: lighten($brand-primary-1, 15%);
	}

	a.selected {
		color: $text-reverse;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.6);
		background-color: $brand-primary;
		cursor: default;
	}

	.dropdown {
		position: relative;
		display: block;
	}

	// .icon::after {
	// 	font-family: "Font Awesome 5 Free";
	// 	font-weight: 900;
	// 	content: "\f107";
	// }

	.dropdown-content {
		display: none;
		position: absolute;
		left: 2rem;
		background-color: $bg-light;
		min-width: 300px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		padding: 0.5em 0.75em;
		z-index: 5;

		a {
			display: block;
			margin: 0;
			font-size: 0.85em;
		}

		a:hover {
			background-color: darken($nav-drop-bg-color, 10%);
		}

		a.selected:hover {
			background-color: $brand-primary;
		}
	}

	// .dropdown:hover .dropdown-content {
	//   display: block;
	// }

	.dropdown.open .dropdown-content {
		display: block;
	}

	.toggle-bar {
		display: none;

		.toggle-bar-logo {
			padding: 0 0.5rem;
		}
	}

	.bottom-nav a {
		color: $text-reverse;
		background-color: unset;

		&:hover {
			text-decoration: underline;
		}
	}

	@media screen and (max-width: $bp-small) {
		.toggle-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: $nav-bg-color;
		}

		.show-horizontal {
			display: none !important;
		}

		.show-vertical {
			display: block !important;
		}

		.home {
			display: block;

			img {
				display: none;
			}
		}

		.nav-toggle {
			display: inline-block;
			padding: 0.5em;

			i {
				display: block;
				font-size: 1.2em;

				&:hover {
					cursor: pointer;
				}
			}
		}

		.nav-vertical {
			nav {
				display: none;
				position: absolute;
				z-index: 1;
				transition: height 0.5s ease 0;

				a {
					display: block;
					min-width: 160px;
					box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
					padding: 0.5em 0.75em;
				}

				a,
				a:first-child {
					margin: 0.5em;
				}
			}

			// &:hover nav {
			//   display: block;
			// }

			&.open nav {
				display: block;
			}
		}
	}
</style>
