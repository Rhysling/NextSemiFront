type Route = {
	title: string;
	navName?: string;
	page: string;
	path: string;
	isAdmin?: boolean;
	isHidden?: boolean;
	isExpanded?: boolean;
	hasParam?: boolean;
	children?: Route[];
	hasSelectedChild?: boolean;
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type PageState = {
	itemsPerPage: number;
	itemCount: number;
	currentPage: number;
	startIndex: number;
	endIndex: number;
};

type RecaptchaVerificationResult = {
	success: boolean;
	score: number;
	action: string;
	challenge_ts: string;
	hostname: string;
	errorCodes: string[];
};

type ContactMessage = {
	name: string;
	email: string;
	company: string;
	phone: string;
	message: string;
};