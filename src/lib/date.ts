import moment from 'moment';
import 'moment/locale/ru';

/**
 * Format date and optional time using moment to Russian locale.
 * Example output: "13 марта 2026 13:00"
 */
export const formatDateTime = (date?: string, time?: string | null): string => {
  if (!date) return '';

  const value = [date, time || ''].join(' ').trim();
  const m = moment(value);

  if (!m.isValid()) {
    // Fallback to raw values if parsing fails
    return time ? `${date} • ${time}` : date;
  }

  return m.locale('ru').format('D MMMM YYYY HH:mm');
};


