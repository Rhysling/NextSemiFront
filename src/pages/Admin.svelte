<script lang="ts">
	import { user } from "../stores/user-store";
	import { navTo, isShowLogin } from "../stores/route-store";
	import MainContainer from "../components/MainContainer.svelte";

	if(!$user.isAdmin) {
		navTo(null, "/");
		$isShowLogin = true;
	}

</script>

<MainContainer headline="Admin Home">
	<a href="/" on:click={e => navTo(e, "/admin-ip")}>Admin IP</a>
	<a href="/" on:click={e => navTo(e, "/admin-contacts")}>Admin Contacts</a>
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	a {
		display: block;
		margin: 1rem;
	}
</style>
