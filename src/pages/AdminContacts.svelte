<script lang="ts">
	import { httpClient as ax } from "../stores/httpclient-store";
	import MainContainer from "../components/MainContainer.svelte";

	let contactList: ContactMessage[] = [];

	const getItems = async () => {
		let res = await $ax.get<ContactMessage[]>("/api/AdminContacts/GetAll");
		contactList = res.data;
	};

	getItems();
</script>

<MainContainer headline="Contact Messages">
	{#each contactList as c}
		<div class="contact">
			<div>{c.sentAt}</div>
			<div>{c.name}</div>
			<div>{c.email}</div>
			<div>{c.company || "No company"}</div>
			<div>{c.phone || "No phone"}</div>
			<div>{c.message || "No message"}</div>
		</div>
	{/each}
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.contact {
		margin: 1rem;
	}
</style>
