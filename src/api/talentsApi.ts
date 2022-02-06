import { child, get, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Section } from '../types';
import { sanitizeText } from '../utils/sanitizeText';

const TALENTS_DB_KEY = 'talents';

export async function fetchTalents() {
  const snapshot = await get(child(ref(database), TALENTS_DB_KEY));
  const data: Section[] = snapshot.val() || [];

  return data;
}

export async function updateTalents(talents: Section[]) {
  return update(ref(database), {
    [TALENTS_DB_KEY]: talents.map(section => ({
      title: section.title,
      text: sanitizeText(section.text),
    })),
  });
}
