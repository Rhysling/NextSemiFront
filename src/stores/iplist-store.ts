import { writable } from 'svelte/store';

export const ipList = writable<IpItem[]>([]);
