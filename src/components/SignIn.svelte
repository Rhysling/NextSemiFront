<script lang="ts">
	import Modal from "./Modal.svelte";
	import { user, isLoggedIn, isAdmin } from "../stores/user-store";
	import { httpClient as ax } from "../stores/httpclient-store";
	import type { AxiosError } from "axios";

	export let isAdminOnly = false;

	$: isShowModal = false;

	let userLogin: UserLogin;

	let isValidEmail: TriState = null;
	let emailValidationMessage = "";

	let isValidPassword: TriState = null;
	let passwordValidationMessage = "";

	let submitErrorMessage = "";

	let isAllValid = false;

	$: if (isAdminOnly) isShowModal = !$isAdmin;

	$: isAllValid = !!(isValidEmail && isValidPassword);

	const showModal = (val: boolean) => (isShowModal = val);

	const showLogin = () => {
		showModal(true);
	};

	const resetUserLogin = () => {
		isValidEmail = null;
		emailValidationMessage = "";
		submitErrorMessage = "";

		userLogin = {
			email: "",
			fullName: "",
			pw: "",
		};
	};

	const signOut = () => {
		user.logOut();
		isShowModal = true;
	};

	const validateEmail = () => {
		emailValidationMessage = "";
		userLogin.email = userLogin.email.trim();

		if (userLogin.email == "") {
			emailValidationMessage = "Email required.";
			isValidEmail = false;
			return;
		}

		isValidEmail =
			/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
				userLogin.email
			);

		if (!isValidEmail)
			emailValidationMessage = "Email address doesn't look right.";
	};

	const validatePassword = () => {
		passwordValidationMessage = "";
		userLogin.pw = userLogin.pw.trim();

		if (userLogin.pw == "") {
			passwordValidationMessage = "Password required.";
			isValidPassword = false;
			return;
		}
		isValidPassword = true;
	};

	const signIn = async () => {
		validateEmail();
		validatePassword();

		if (!isAllValid) return;

		// let uc: UserClient = {
		// 	userId: 123,
		// 	fullName: userLogin.fullName,
		// 	email: userLogin.email,
		// 	token: "the token here",
		// 	isAdmin: true,
		// };

		// user.set(uc);
		// console.log({ uc });
		// return;

		try {
			let res = await $ax.post<UserClient>("/api/Login", userLogin);
			if (res && res.data) {
				user.set(res.data);
				console.log({ uc: res.data });
				resetUserLogin();
				isShowModal = false;
			} else {
				submitErrorMessage = "Something went wrong.";
			}
		} catch (error: any) {
			const err = <AxiosError>error;
			console.log(err);
			if (err.response?.status) {
				let s = +error.response.status;
				submitErrorMessage =
					s >= 400 && s < 500
						? "Email/password incorrect."
						: "Something went wrong.";
			} else {
				submitErrorMessage = "Something went wrong.";
			}
		}
	};

	let cancel = function () {
		resetUserLogin();
		isShowModal = true;
	};

	// Init

	resetUserLogin();
</script>

{#if $isLoggedIn}
	{$user.fullName || $user.email} &#8226;
	<a href="/" on:click|preventDefault={signOut}>Sign out</a>
{:else}
	<a href="/" on:click|preventDefault={() => showLogin()}>Sign in</a>
{/if}

<Modal {isShowModal} on:setmodal={() => {}}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="signin-container" on:click={(e) => e.stopPropagation()}>
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
					placeholder="email"
					bind:value={userLogin.email}
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
			<label for="password" class="label has-text-left">
				Password
				<span class="is-size-7 has-text-danger" title="Required">(*)</span>
			</label>
			<div class="control has-icons-right">
				<input
					id="password"
					class="input"
					class:is-info={isValidPassword === null}
					class:is-success={isValidPassword === true}
					class:is-danger={isValidPassword === false}
					type="password"
					placeholder="Password"
					bind:value={userLogin.pw}
					on:blur={validatePassword}
				/>
				<span class="icon is-small is-right">
					{#if isValidPassword === true}
						<i class="fas fa-check" />
					{/if}
					{#if isValidPassword === false}
						<i class="fas fa-exclamation-triangle" />
					{/if}
				</span>
			</div>
			{#if isValidPassword === false}
				<p class="help is-danger">
					{passwordValidationMessage}
				</p>
			{:else}
				<p class="help">&nbsp;</p>
			{/if}
		</div>

		<div class="field is-grouped" style="align-items: center;">
			<div class="control">
				<button
					class="button is-success"
					on:click={signIn}
					disabled={!isAllValid}
				>
					Submit
				</button>
			</div>
			<div class="control">
				<button class="button" on:click={cancel}> Cancel </button>
			</div>
			<div style="color:red;">{submitErrorMessage}</div>
		</div>
	</div>
</Modal>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.signin-container {
		position: relative;
		background-color: #fefefe;
		margin: 4rem auto;
		padding: 2rem;
		border: 1px solid #888;
		border-radius: 5px;
		max-width: 600px;
	}

	label {
		text-align: left;
	}
</style>
