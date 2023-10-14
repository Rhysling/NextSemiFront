<script lang="ts">
	import { testCaptcha, sendContactMsg } from "../lib/ajax";
	import { navTo } from "../stores/route-store.js";
	import MainContainer from "../components/MainContainer.svelte";

	let msg: ContactMessage = {
		name: "",
		email: "",
		company: "",
		phone: "",
		message: "",
	};

	let isValidName: TriState = null; // true / false
	let isValidEmail: TriState = null; // true / false
	let isValidCompany: TriState = null; // true / false
	let emailValidationMessage = "";
	let validationSummaryMessage = "";
	let isNotSent = true;
	let isDone = false;

	$: isAllValid = isValidName && isValidEmail && isValidCompany && isNotSent;

	const validateName = () => {
		msg.name = msg.name || "";
		msg.name = msg.name.trim();

		isValidName = msg.name.length > 2;
	};

	const validateEmail = () => {
		msg.email = msg.email || "";
		emailValidationMessage = "";
		msg.email = msg.email.trim();

		if (msg.email == "") {
			emailValidationMessage = "Email required.";
			isValidEmail = false;
			return;
		}

		isValidEmail =
			/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
				msg.email
			);

		if (!isValidEmail)
			emailValidationMessage = "Email address doesn't look right.";
	};

	const validateCompany = () => {
		msg.company = msg.company || "";
		msg.company = msg.company.trim();

		isValidCompany = msg.company.length > 2;
	};

	const resetValues = () => {
		msg.name = "";
		msg.email = "";
		msg.company = "";
		msg.phone = "";
		msg.message = "";
	};

	const submit = async () => {
		validateName();
		validateEmail();
		validateCompany();

		if (!isAllValid) {
			validationSummaryMessage = "Please make the changes noted above.";
			return;
		}

		isNotSent = false;

		let res: RecaptchaVerificationResult;

		try {
			res = await testCaptcha();
		} catch (e: any) {
			console.error({ e });
			validationSummaryMessage =
				"Something went wrong.  Please call or email us directly.";
			isDone = false;
			return;
		}

		if (res.score > 0.6) {
			let srCode = 0;
			try {
				srCode = await sendContactMsg(msg);
			} catch (e: any) {
				console.error({ e });
				validationSummaryMessage =
					"Something went wrong.  Please call or email us directly.";
				isDone = false;
				return;
			}

			if (srCode < 300) {
				validationSummaryMessage = "";
				isDone = true;
			} else {
				console.error("Failure:", srCode);
				validationSummaryMessage =
					"Something went wrong.  Please call or email us directly.";
				isDone = false;
			}
		} else {
			validationSummaryMessage =
				"The system thinks you are a robot.  Please call or email us directly.";
			isDone = false;
		}
	};

	let cancel = function () {
		resetValues();

		isValidName = null;
		isValidEmail = null;
		isValidCompany = null;
		emailValidationMessage = "";
		validationSummaryMessage = "";

		isNotSent = true;
		isDone = false;
	};
</script>

<MainContainer headline="Contact Us" maxWidth="600px">
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
					bind:value={msg.name}
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
					bind:value={msg.email}
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
			<label for="your-company" class="label">
				Company / Organization
				<span class="is-size-7 has-text-danger" title="Required">(*)</span>
			</label>
			<div class="control has-icons-right">
				<input
					id="your-company"
					class="input"
					class:is-info={isValidCompany === null}
					class:is-success={isValidCompany === true}
					class:is-danger={isValidCompany === false}
					type="text"
					placeholder="Your company / organization"
					bind:value={msg.company}
					on:blur={validateCompany}
				/>
				<span class="icon is-small is-right">
					{#if isValidCompany === true}
						<i class="fas fa-check" />
					{/if}
					{#if isValidCompany === false}
						<i class="fas fa-exclamation-triangle" />
					{/if}
				</span>
			</div>
			{#if isValidCompany === false}
				<p class="help is-danger">
					Please include the name of your company or organization.
				</p>
			{:else}
				<p class="help">&nbsp;</p>
			{/if}
		</div>

		<div class="field">
			<label for="phone" class="label">Phone Number</label>
			<div class="control">
				<input
					id="phone"
					class="input is-info"
					type="text"
					bind:value={msg.phone}
					placeholder="Phone"
				/>
			</div>
		</div>

		<div class="field">
			<label for="message" class="label">Message</label>
			<div class="control">
				<textarea
					id="message"
					class="textarea is-info"
					bind:value={msg.message}
					placeholder="How can we help you?"
				/>
			</div>
		</div>

		<div class="field is-grouped">
			<div class="control">
				<button
					class="button is-success"
					on:click={submit}
					disabled={!isAllValid}
				>
					Submit
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
		<div class="done-subhead">Your Message is Sent</div>

		<div class="done-title">Name</div>
		<div class="done-text">{msg.name}</div>

		<div class="done-title">Email</div>
		<div class="done-text">{msg.email}</div>

		<div class="done-title">Company / Organization</div>
		<div class="done-text">{msg.company}</div>

		<div class="done-title">Phone</div>
		<div class="done-text">{msg.phone || "None"}</div>

		<div class="done-title">Message</div>
		<div class="done-text">{msg.message || "None"}</div>

		<div class="done-button-container">
			<button
				class="button is-link"
				on:click={(e) => navTo(e, "/")}
				on:click={cancel}
			>
				Done
			</button>
		</div>
	{/if}
</MainContainer>

<style lang="scss">
	@import "../styles/_custom-variables.scss";

	.contact-error {
		color: $error-primary;
		margin: 0.3rem 0;
	}

	.done-title {
		margin: 0.5rem 0 0;
		padding: 0.25rem;
		font-weight: bold;
	}

	.done-text {
		margin: 0;
		padding: 0.25rem 0.5rem 0.25rem 1.5rem;
		font-weight: normal;
	}

	.done-subhead {
		font-size: 1.25rem;
		font-weight: bold;
		padding: 0 0 0.5rem;
		text-align: center;
	}

	.done-button-container {
		margin: 1rem 0;
		padding: 1rem;
		border-top: 2px solid black;
		text-align: center;
	}
</style>
