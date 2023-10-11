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
		<div
			class="nav-toggle"
			on:mouseenter={() => setOpenRoot(true)}
			on:click|stopPropagation={() => setOpenRoot(!isOpenRoot)}
		>
			<i class="fa-solid fa-bars" />
		</div>
		<nav>
			<div class="home">
				<a href="/" on:click={(e) => nav(e, "/")}>
					<img src="./assets/img/logo-sm.png" alt="Home" /><span>Home</span></a
				>
			</div>

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
		align-items: center;
		justify-content: space-between;
		background-color: $nav-bg-color;
	}

	.menu-item {
		display: block;
		box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		padding: 0.5em;
		margin: 0.5em;
	}

	.home {
		flex-grow: 1;
		display: block;
		padding: 0;
		margin: 0;

		span {
			display: none;
		}

		a {
			display: inline-block;
		}

		img {
			display: inline-block;
			width: 109px;
			height: 30px;
		}
	}

	// a:first-child {
	//   margin: 0.5em 0.5em 0.5em 0.25rem;
	// }

	a:hover {
		background-color: darken($nav-bg-color, 10%);
	}

	a.has-selected-child {
		background-color: lighten($brand-primary, 20%);
	}

	a.selected {
		color: $text-reverse;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.6);
		background-color: $brand-primary;
		cursor: default;

		&:hover {
			text-decoration: none;
		}
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
		min-width: 160px;
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

	.nav-toggle {
		display: none;
	}

	.bottom-nav a {
		color: $text-reverse;
	}

	@media screen and (max-width: $bp-small) {
		.nav-toggle {
			display: inline-block;
			background-color: $nav-bg-color;
			padding: 0.5em;

			i {
				display: block;
				font-size: 1.2em;

				&:hover {
					cursor: pointer;
				}
			}
		}

		.home {
			span {
				display: inline;
			}

			img {
				display: none;
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
