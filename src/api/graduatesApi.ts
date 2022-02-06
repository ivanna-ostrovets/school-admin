import { child, get, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Section } from '../types';
import { sanitizeText } from '../utils/sanitizeText';

const GRADUATES_DB_KEY = 'graduates';

export async function fetchGraduates() {
  const snapshot = await get(child(ref(database), GRADUATES_DB_KEY));
  const data: Section[] = snapshot.val() || [];

  return data;
}

export async function updateGraduates(graduates: Section[]) {
  return update(ref(database), {
    [GRADUATES_DB_KEY]: graduates.map(section => ({
      title: section.title,
      text: sanitizeText(section.text),
    })),
  });
}
