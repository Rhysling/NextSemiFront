<script lang="ts">
	import { httpClient as ax } from "../stores/httpclient-store";
	import MainContainer from "../components/MainContainer.svelte";

	let userList: UserClientRemote[] = [];

	const getItems = async () => {
		let res = await $ax.get<UserClientRemote[]>("/api/Users/GetAll");
		userList = res.data;
	};

	getItems();
</script>

<MainContainer headline="Admin Users">
	{#each userList as u}
		<div class="contact">
			<div>{u.userId}</div>
			<div>{u.fullName}</div>
			<div>{u.email}</div>
			<div style="overflow-wrap: break-word;">{u.token || "No token"}</div>
			<div>{u.isAdmin ? "Admin" : "Not admin"}</div>
			<div>{u.isDisabled ? "Disabled" : "Enabled"}</div>
		</div>
	{/each}
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.contact {
		margin: 1rem;
	}
</style>
