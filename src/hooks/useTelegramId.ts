import { useMemo } from 'react';

/**
 * Custom hook to get the Telegram ID from localStorage
 * Returns the telegramId as a number, defaulting to 1739711843 if not found
 */
export const useTelegramId = (): number => {
  return useMemo(() => {
    const telegramId = localStorage.getItem('telegramId');
    return Number(telegramId || '1739711843');
  }, []);
};

