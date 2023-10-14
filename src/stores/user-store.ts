
import { localStore } from './localstorage-store';
import { get, derived } from 'svelte/store';

const getEmptyUser = () => {
	return {
		userId: 0,
		email: "",
		fullName: "",
		token: "",
		isAdmin: false
	}
};

const u = localStore<UserClient>("user", getEmptyUser());

export const user = {
	...u,
	logOut: () => u.set(getEmptyUser())
};

export const isLoggedIn = derived(
	user,
	$user => !!$user.email
);

export const isAdmin = derived(
	user,
	$user => !!$user.isAdmin
);