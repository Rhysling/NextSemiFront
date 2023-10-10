<script lang="ts">
	//import { myRandomStore as rs } from "../stores/my-random-store";
	import rs from "../stores/my-random-store";
</script>

<h2>Demonstrate Stores</h2>

<div><i class="fa-solid fa-arrow-right" /> is a solid right arrow.</div>
<div><i class="fa-regular fa-arrow-right" /> is a pro regular right arrow.</div>
<div><i class="fa-solid fa-download" /> is a solid download.</div>
<div><i class="fa-regular fa-download" /> is a pro regular download.</div>
<div><i class="fa-solid fa-caret-up" /> is a solid caret up.</div>
<div><i class="fa-regular fa-caret-up" /> is a pro caret up.</div>
<div><i class="fa-solid fa-user" /> is a solid user.</div>
<div><i class="fa-regular fa-user" /> is a regular user.</div>
<div><i class="fa-solid fa-skull-crossbones" /></div>

<div class="card">Blah</div>

<div class="card">
	<div>Result = {$rs}</div>
	<div>
		<button type="button" on:click|preventDefault={rs.run}>Run Random</button>
	</div>
</div>

<p>More Stuff</p>
<p>More Stuff</p>
<p>More Stuff</p>
<p>More Stuff</p>
<p>More Stuff</p>
<p>More Stuff</p>
<p>More Stuff</p>
<p>More Stuff</p>

<style lang="scss">
	h2 {
		margin: 1rem 0;
	}

	p {
		padding: 3rem 2rem;
	}
</style>
