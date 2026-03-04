const LOCAL_API_BASE_URL = 'https://severely-superior-monster.cloudpub.ru/api';
const TG_API_BASE_URL = 'https://vfqc-bc18-fu02.gw-1a.dockhost.net/api';

/** Returns the API base URL. Change the returned value below to switch backends. */
export function getApiBaseUrl(): string {
  return TG_API_BASE_URL; // Switch to LOCAL_API_BASE_URL for local backend
}

