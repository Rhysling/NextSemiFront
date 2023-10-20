// Using MSBuild ver. 7.0.402 to load projects.
// Generated - 2023/10/20-15:23:04

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

type UserClient = {
	userId: number;
	email: string;
	fullName: string;
	token: INullable<string>;
	isAdmin: boolean;
};

type UserLogin = {
	email: string;
	fullName: string;
	pw: string;
};

