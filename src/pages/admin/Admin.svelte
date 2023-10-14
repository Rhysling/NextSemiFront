<script lang="ts">
	import MainContainer from "../../components/MainContainer.svelte";
	import SignIn from "../../components/SignIn.svelte";
	import { user } from "../../stores/user-store";
</script>

<div class="login-container">
	<SignIn isAdminOnly={true} />
</div>

<MainContainer headline="">
	<p>Admin Here</p>
</MainContainer>

<style lang="scss">
	@import "../../styles/_custom-variables.scss";

	.login-container {
		max-width: $content-width;
		margin: 0 auto;
		text-align: right;
		font-size: 0.8rem;
		padding: 0.5rem 0 0;
	}

	p {
		padding: 3rem 2rem;
	}
</style>
