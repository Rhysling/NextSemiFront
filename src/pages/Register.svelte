<script lang="ts">
	import { navTo } from "../stores/route-store";
	import { user } from "../stores/user-store";
	import { httpClient as ax } from "../stores/httpclient-store";
	import MainContainer from "../components/MainContainer.svelte";
	import Nav from "../components/Nav.svelte";

	let reg: UserRegister = {
		fullName: "",
		email: "",
		pw: "",
	};

	let isValidName: TriState = null; // true / false
	let isValidEmail: TriState = null; // true / false
	let isValidPw: TriState = null; // true / false
	let nameValidationMessage = "";
	let emailValidationMessage = "";
	let pwValidationMessage = "";
	let validationSummaryMessage = "";
	let isDone = false;

	$: isAllValid = isValidName && isValidEmail && isValidPw;

	const validateName = () => {
		reg.fullName = reg.fullName || "";
		reg.fullName = reg.fullName.trim();

		isValidName = reg.fullName.length > 1;

		if (isValidName)
			nameValidationMessage = "";
		else
			nameValidationMessage = "Name must be at least 2 characters.";
	};

	const validateEmail = () => {
		reg.email = reg.email || "";
		emailValidationMessage = "";
		reg.email = reg.email.trim();

		if (reg.email == "") {
			emailValidationMessage = "Email required.";
			isValidEmail = false;
			return;
		}

		isValidEmail =
			/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
				reg.email
			);

		if (!isValidEmail)
			emailValidationMessage = "Email address doesn't look right.";
	};

	const validatePw = () => {
		reg.pw = reg.pw || "";

		if (reg.pw !== reg.pw.trim()) {
			isValidPw = false;
			pwValidationMessage = "Password can't begin or end with spaces.";
			return;
		}

		if (reg.pw.length < 6) {
			isValidPw = false;
			pwValidationMessage = "Password must be at least 6 characters.";
			return;
		}

		isValidPw = true;
		pwValidationMessage = "";
	};

	const resetValues = () => {
		reg.fullName = "";
		reg.email = "";
		reg.pw = "";
	};

	const submit = async () => {
		validateName();
		validateEmail();
		validatePw();

		validationSummaryMessage = isAllValid
			? "" : "Please make the changes noted above.";

		if (!isAllValid)
			return;

		try {
			let res = await $ax.post<any>("/api/Users/Register", reg);
			user.set(res.data);
			navTo(null, "/");
		}
		catch (e) {
			console.error(e);
		}


	}

	let cancel = function () {
		resetValues();

		isValidName = null;
		isValidEmail = null;
		isValidPw = null;
		nameValidationMessage = "";
		emailValidationMessage = "";
		pwValidationMessage = "";
		validationSummaryMessage = "";

		isDone = false;
	};
</script>

<MainContainer headline="Register" maxWidth="600px">
	{#if !isDone}
		<!-- Form start-->
		<div class="field">
			<label for="your-name" class="label">
				Name
				<span class="is-size-7 has-text-danger" title="Required">(*)</span>
			</label>
			<div class="control has-icons-right">
				<input
					id="your-name"
					class="input"
					class:is-info={isValidName === null}
					class:is-success={isValidName === true}
					class:is-danger={isValidName === false}
					type="text"
					placeholder="Your name"
					bind:value={reg.fullName}
					on:blur={validateName}
				/>
				<span class="icon is-small is-right">
					{#if isValidName === true}
						<i class="fas fa-check" />
					{/if}
					{#if isValidName === false}
						<i class="fas fa-exclamation-triangle" />
					{/if}
				</span>
			</div>
			{#if isValidName === false}
				<p class="help is-danger">Please include your name.</p>
			{:else}
				<p class="help">&nbsp;</p>
			{/if}
		</div>

		<div class="field">
			<label for="email" class="label">
				Email
				<span class="is-size-7 has-text-danger" title="Required">(*)</span>
			</label>
			<div class="control has-icons-left has-icons-right">
				<input
					id="email"
					class="input"
					class:is-info={isValidEmail === null}
					class:is-success={isValidEmail === true}
					class:is-danger={isValidEmail === false}
					type="email"
					placeholder="Your email"
					bind:value={reg.email}
					on:blur={validateEmail}
				/>
				<span class="icon is-small is-left">
					<i class="fas fa-envelope" />
				</span>
				<span class="icon is-small is-right">
					{#if isValidEmail === true}
						<i class="fas fa-check" />
					{/if}
					{#if isValidEmail === false}
						<i class="fas fa-exclamation-triangle" />
					{/if}
				</span>
			</div>
			{#if isValidEmail === false}
				<p class="help is-danger">{emailValidationMessage}</p>
			{:else}
				<p class="help">&nbsp;</p>
			{/if}
		</div>

		<div class="field">
			<label for="pw" class="label">
				Password
				<span class="is-size-7 has-text-danger" title="Required">(*)</span>
			</label>
			<div class="control has-icons-right">
				<input
					id="pw"
					class="input"
					class:is-info={isValidPw === null}
					class:is-success={isValidPw === true}
					class:is-danger={isValidPw === false}
					type="password"
					placeholder="Your password"
					bind:value={reg.pw}
					on:blur={validatePw}
				/>
				<span class="icon is-small is-right">
					{#if isValidPw === true}
						<i class="fas fa-check" />
					{/if}
					{#if isValidPw === false}
						<i class="fas fa-exclamation-triangle" />
					{/if}
				</span>
			</div>
			{#if isValidPw === false}
				<p class="help is-danger">
					{pwValidationMessage}
				</p>
			{:else}
				<p class="help">&nbsp;</p>
			{/if}
		</div>

		<div class="field is-grouped">
			<div class="control">
				<button
					class="button is-success"
					on:click={submit}
					disabled={!isAllValid}
				> Submit
				</button>
			</div>
			<div class="control">
				<button class="button" on:click={cancel}> Cancel </button>
			</div>
		</div>
		<div>
			<p class="contact-error">
				{validationSummaryMessage}&nbsp;
			</p>
		</div>
		<!-- Form end-->
	{:else}
		<div class="done-subhead">Your are registered.</div>
	{/if}
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.contact-error {
		color: $error-primary;
		margin: 0.3rem 0;
	}

	.done-subhead {
		font-size: 1.25rem;
		font-weight: bold;
		padding: 0 0 0.5rem;
		text-align: center;
	}

</style>
