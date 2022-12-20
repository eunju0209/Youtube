import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export function formatAgo(data: string, lang: string = 'en_US'): string {
  return format(data, lang);
}
