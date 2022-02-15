import { child, get, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { SiteInfo } from '../types';

const SITE_INFO_DB_KEY = 'siteInfo';

export async function fetchSiteInfo() {
  const snapshot = await get(child(ref(database), SITE_INFO_DB_KEY));
  const data: SiteInfo = snapshot.val() || {};

  return data;
}

export async function updateSiteInfo(info: SiteInfo) {
  return update(ref(database), { [SITE_INFO_DB_KEY]: info });
}
