import { localStorageWritable } from '$lib/utils/store';

export const autoClipboard = localStorageWritable<boolean>('autoClipboard', false);
