import { writable } from 'svelte/store';

// Shared counter store - all instances will use this
export const sharedCount = writable(0);
