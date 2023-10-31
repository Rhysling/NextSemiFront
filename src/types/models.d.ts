// Using MSBuild ver. 7.0.403 to load projects.
// Generated - 2023/10/29-11:21:04

// SOLUTION: NextSemiBack

// PROJECT SEARCHED:
//	NextSemiBack

type INullable<T> = T | null | undefined;

// NAMESPACE: NextSemiBack.Models

type ContactMessage = {
	name: string;
	email: string;
	company: string;
	phone: string;
	message: string;
	sentAt: INullable<string>;
	statusCode: number;
};

type IpItem = {
	id: number;
	name: string;
	category: string;
	description: string;
	resolution: string;
	speed: string;
	technology: string;
	fileName: INullable<string>;
};

type UserClientRemote = {
	userId: number;
	email: string;
	fullName: string;
	token: INullable<string>;
	isAdmin: boolean;
	isDisabled: boolean;
};

type UserLogin = {
	email: string;
	pw: string;
};

type UserRegister = {
	fullName: string;
	email: string;
	pw: string;
};
