import { writable } from "svelte/store";

export const selectedParcelId = writable<string | number | null>(null);
