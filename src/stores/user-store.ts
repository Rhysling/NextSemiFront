
import { localStore } from './localstorage-store';
import { derived } from 'svelte/store';

const getEmptyUser = () => {
	return {
		userId: 0,
		email: "",
		fullName: "",
		token: "",
		isAdmin: false,
		isDisabled: false
	}
};

const u = localStore<UserClientRemote>("user", getEmptyUser());

export const user = {
	...u,
	logOut: () => u.set(getEmptyUser())
};

export const isLoggedIn = derived(
	user,
	$user => !!$user.email
);
