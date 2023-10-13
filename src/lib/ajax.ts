import ax from "axios";

declare var baseURL: string;

// Google reCAPTCHA
const siteKey = "6Lf7mJsoAAAAAB6Io7tWiZSeSf8g2Xe_iAhzcepd";

export const testCaptcha = async () => {

	let token = await grecaptcha.execute(siteKey, {
		action: "contactus",
	});

	let res = await ax.post<RecaptchaVerificationResult>(baseURL + "/api/recaptcha/verify", { token });

	return res.data;
}

export const sendContactMsg = async (msg: ContactMessage) => {

	let res = await ax.post(baseURL + "/api/SendContact?k=812g", msg);
	return res.status;
}

