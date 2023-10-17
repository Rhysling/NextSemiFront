<script lang="ts">
	import { httpClient as ax } from "../stores/httpclient-store";
	import { ipList } from "../stores/iplist-store.js";

	import MainContainer from "../components/MainContainer.svelte";

	let isShowList = true;

	const resetCurrentItem = () => {
		const a: IpItem = {
			id: 0,
			name: "",
			category: "",
			description: "",
			resolution: "",
			speed: "",
			technology: "",
			fileName: undefined,
		};

		return a;
	};

	let currentItem = resetCurrentItem();

	const getItems = async () => {
		let res = await $ax.get<IpItem[]>("/api/IpItems");
		ipList.set(res.data);
	};

	const addItem = () => {
		currentItem = resetCurrentItem();
		isShowList = false;
	};

	const editItem = (a: IpItem) => {
		currentItem = a;
		isShowList = false;
	};

	const deleteItem = async (item: IpItem) => {
		if (confirm(`Delete (${item.id}) ${item.name}?`)) {
			$ipList = $ipList.filter((a) => a.id !== item.id);
			await $ax.post<IpItem[]>("/api/IpItems/Delete", item);
		}
	};

	const saveItem = async () => {
		if (!currentItem.name) return;

		let item = { ...currentItem };

		if (item.id == 0)
			item.id = $ipList.reduce((a, b) => Math.max(a, b.id), 0) + 1;

		let ix = $ipList.findIndex((a) => a.id === item.id);

		if (ix > -1) $ipList[ix] = item;
		else $ipList = [...$ipList, item];

		await $ax.post<IpItem[]>("/api/IpItems/Save", item);

		currentItem = resetCurrentItem();
		isShowList = true;
	};

	const cancel = () => {
		currentItem = resetCurrentItem();
		isShowList = true;
	};

	// Go

	getItems();
	//
</script>

<MainContainer headline="IP Admin">
	{#if isShowList}
		<div class="list-container">
			<div class="list-title">Id</div>
			<div class="list-title">Name</div>
			<div class="list-title">Category</div>
			<div class="list-title">Description</div>
			<div class="list-title">Resolution</div>
			<div class="list-title">Speed</div>
			<div class="list-title">Technology</div>
			<div>&nbsp;</div>
			{#each $ipList as a, i}
				<div>{a.id}</div>
				<div>{a.name}</div>
				<div>{a.category}</div>
				<div>{a.description}</div>
				<div>{a.resolution}</div>
				<div>{a.speed}</div>
				<div>{a.technology}</div>
				<div>
					<a href="/" on:click|preventDefault={() => editItem(a)}>Edit</a>
					&#8226;
					<a href="/" on:click|preventDefault={() => deleteItem(a)}>Delete</a>
				</div>
			{/each}
		</div>
		<div class="field button-field">
			<div class="control">
				<button class="button is-success" on:click={addItem}> Add </button>
			</div>
		</div>
	{:else}
		<h2>{currentItem.id === 0 ? "Add" : "Edit"} Item</h2>

		<div class="field">
			<label for="id" class="label">Id</label>

			<span>{currentItem.id}</span>
		</div>

		<div class="field">
			<label for="nameIp" class="label">Name</label>
			<div class="control">
				<input
					id="nameIp"
					class="input is-info"
					type="text"
					bind:value={currentItem.name}
					placeholder="Name"
				/>
			</div>
		</div>

		<div class="field">
			<label for="category" class="label">Category</label>
			<div class="control">
				<input
					id="category"
					class="input is-info"
					type="text"
					bind:value={currentItem.category}
					placeholder="Category"
				/>
			</div>
		</div>

		<div class="field">
			<label for="description" class="label">Description</label>
			<div class="control">
				<input
					id="description"
					class="input is-info"
					type="text"
					bind:value={currentItem.description}
					placeholder="Description"
				/>
			</div>
		</div>

		<div class="field">
			<label for="resolution" class="label">Resolution</label>
			<div class="control">
				<input
					id="resolution"
					class="input is-info"
					type="text"
					bind:value={currentItem.resolution}
					placeholder="Resolution"
				/>
			</div>
		</div>

		<div class="field">
			<label for="speed" class="label">Speed</label>
			<div class="control">
				<input
					id="speed"
					class="input is-info"
					type="text"
					bind:value={currentItem.speed}
					placeholder="Speed"
				/>
			</div>
		</div>

		<div class="field">
			<label for="technology" class="label">Technology</label>
			<div class="control">
				<input
					id="technology"
					class="input is-info"
					type="text"
					bind:value={currentItem.technology}
					placeholder="Technology"
				/>
			</div>
		</div>

		<div class="field is-grouped button-field">
			<div class="control">
				<button class="button is-success" on:click={saveItem}> Save </button>
			</div>
			<div class="control">
				<button class="button" on:click={cancel}> Cancel </button>
			</div>
		</div>
		<div>
			<p class="form-error">&nbsp;</p>
		</div>
	{/if}
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.list-container {
		display: grid;
		grid-template-columns: 0.25fr repeat(7, 1fr);

		div {
			font-size: 0.9rem;
			padding: 0.2rem;
		}

		> div:nth-child(16n + 1),
		> div:nth-child(16n + 2),
		> div:nth-child(16n + 3),
		> div:nth-child(16n + 4),
		> div:nth-child(16n + 5),
		> div:nth-child(16n + 6),
		> div:nth-child(16n + 7),
		> div:nth-child(16n + 8) {
			background: #eeeeee;
		}

		.list-title {
			font-weight: bold;
		}
	}

	.button-field {
		margin: 1rem 0 0;
		padding: 1rem;
		border-top: 1px solid black;
	}
</style>
