import {ar} from './ar';
import type {Locale} from './config';
import {en, type Dict} from './en';
import {fr} from './fr';

const dicts: Record<Locale, Dict> = {en, ar, fr};

/** Server-side: the copy for one locale. Client components read it with useI18n(). */
export const getDict = (l: Locale): Dict => dicts[l];

export type {Dict};
export * from './config';
