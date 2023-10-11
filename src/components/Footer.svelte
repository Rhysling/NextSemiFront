<script>
	import Nav from "./Nav.svelte";

	let yr = new Date().getFullYear() - 2000;
</script>

<section class="footer-info">
	<div class="container">
		<div class="tile">
			<div class="subhead">CONTACT US</div>
			<div class="title">NEXT Semiconductor Technologies, Inc.</div>
			4115 Sorrento Valley Blvd.
			<br />
			San Diego, CA 92121
		</div>

		<div class="tile">
			<div class="subhead">PHONE &amp; EMAIL</div>
			<span class="title">Main Phone:</span>
			(858) 707-7033
			<br />
			<br />
			<a href="mailto:info@nextsemi.com?subject=Web Inquiry" class="title"
				>info@nextsemi.com
			</a>
		</div>
	</div>
</section>

<section class="footer-bottom">
	<div class="container">
		<div>
			&copy;20{yr} - NEXT Semiconductor Technologies, Inc.
		</div>
		<div>
			<Nav isFooter={true} />
		</div>
	</div>
</section>

<style lang="scss">
	@import "../styles/_custom-variables.scss";
	//@import "../../node_modules/bulma/sass/utilities/_all.sass";

	section {
		width: 100%;

		&.footer-info {
			color: $white-3;
			background-color: #222222;
			padding: 0 1rem 1rem;
			font-size: 13px;

			a {
				color: $white-3;
				font-weight: bold;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		&.footer-bottom {
			color: $white-2;
			background-color: #333333;
			padding: 1rem;
			font-size: 12px;
		}

		.container {
			display: flex;
			max-width: $bp-small;
			margin: 0 auto;
			justify-content: space-between;
		}

		.tile {
			padding: 1rem 0 0;
		}

		.title {
			font-weight: bold;
		}

		.subhead {
			color: #919191;
			margin: 0 0 0.25rem;
		}
	}

	@media screen and (max-width: $bp-small) {
		section .container {
			display: block;
		}
	}
</style>
