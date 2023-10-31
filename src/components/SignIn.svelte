<script lang="ts">
	import Modal from "./Modal.svelte";
	import { user, isLoggedIn } from "../stores/user-store";
	import { httpClient as ax } from "../stores/httpclient-store";
	import {
		adminRoutes,
		navTo,
		isShowLogin,
		currentRoute,
	} from "../stores/route-store";
	import type { AxiosError } from "axios";
	import Nav from "./Nav.svelte";

	let userLogin: UserLogin;

	let isValidEmail: TriState = null;
	let emailValidationMessage = "";

	let isValidPassword: TriState = null;
	let passwordValidationMessage = "";

	let submitErrorMessage = "";

	let isAllValid = false;

	$: isAllValid = !!(isValidEmail && isValidPassword);

	const resetUserLogin = () => {
		isValidEmail = null;
		emailValidationMessage = "";
		submitErrorMessage = "";

		userLogin = {
			email: "",
			pw: "",
		};
	};

	const showLogin = () => {
		$isShowLogin = true;

		setTimeout(() => {
			let el = document.getElementById("email");
			if (el) {
				el.focus();
			}
		}, 100);
	};

	const signOut = () => {
		if ($currentRoute.isAdmin) navTo(null, "/");

		user.logOut();
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

		try {
			let res = await $ax.post<UserClientRemote>("/api/Users/Login", userLogin);
			if (res && res.data) {
				user.set(res.data);
				console.log({ ucr: res.data });
				resetUserLogin();
				$isShowLogin = false;
			} else {
				submitErrorMessage = "Something went wrong.";
			}
		} catch (error: any) {
			const err = <AxiosError>error;
			console.error(err);
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

	const cancel = function () {
		resetUserLogin();
		$isShowLogin = false;
	};

	// Init
	resetUserLogin();
</script>

<div class="signin-bar-container">
	{#if $isLoggedIn}
		{#if $user.isAdmin}
			{#each $adminRoutes as ar, i}
				{@const len = $adminRoutes.length - 1}
				<a class="signin-item" href="/" on:click={(e) => navTo(e, ar.path)}
					>{ar.navName}</a
				>{#if i < len}<span class="signin-item">&#8226;</span>{/if}
			{/each}
		{/if}
		<div class="signin-item" style="flex-grow:1;text-align:right;">
			{$user.fullName || $user.email} &#8226;
		</div>
		<a href="/" on:click|preventDefault={signOut}>Sign out</a>
	{:else}
		<div class="signin-item" style="flex-grow:1;text-align:right;">&nbsp;</div>

		<a href="/" on:click|preventDefault={(e) => navTo(e, "/register")}
			>Sign up</a
		>
		<span style="margin:0 0.25rem;">&#8226;</span>
		<a href="/" on:click|preventDefault={() => showLogin()}>Sign in</a>
	{/if}
</div>

<Modal isShowModal={$isShowLogin} on:setmodal={() => {}}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="signin-container" on:click={(e) => e.stopPropagation()}>
		<div class="field">
			<label for="email" class="label">
				Email
				<span class="is-size-7 has-text-danger" title="Required">(*)</span>
			</label>
			<div class="control has-icons-left has-icons-right">
				<!-- svelte-ignore a11y-positive-tabindex -->
				<input
					id="email"
					class="input"
					class:is-info={isValidEmail === null}
					class:is-success={isValidEmail === true}
					class:is-danger={isValidEmail === false}
					type="email"
					placeholder="email"
					tabindex="10"
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
				<!-- svelte-ignore a11y-positive-tabindex -->
				<input
					id="password"
					class="input"
					class:is-info={isValidPassword === null}
					class:is-success={isValidPassword === true}
					class:is-danger={isValidPassword === false}
					type="password"
					placeholder="Password"
					tabindex="11"
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
				<!-- svelte-ignore a11y-positive-tabindex -->
				<button
					class="button is-success"
					tabindex="12"
					on:click={signIn}
					disabled={!isAllValid}
				>
					Submit
				</button>
			</div>
			<div class="control">
				<!-- svelte-ignore a11y-positive-tabindex -->
				<button class="button" tabindex="13" on:click={cancel}> Cancel </button>
			</div>
			<div style="color:red;">{submitErrorMessage}</div>
		</div>
		{#if $isLoggedIn}
			<div style="padding:0.5rem;">
				<a href="/" on:click={signOut}>Sign Out</a>
			</div>
		{/if}
	</div>
</Modal>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.signin-bar-container {
		display: flex;
		justify-content: space-between;
		max-width: $content-width;
		margin: 0 auto;
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;

		.signin-item {
			padding: 0 0.25rem 0 0;
		}
	}

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
