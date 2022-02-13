import { child, get, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Section, Talent, TalentTitles } from '../types';
import { sanitizeText } from '../utils/sanitizeText';

const TALENTS_DB_KEY = 'talents';

export async function fetchTalentTitles() {
  const snapshot = await get(child(ref(database), TALENTS_DB_KEY));
  const data: Record<string, Talent> = snapshot.val() || {};

  const talentTitles: TalentTitles = Object.entries(data).reduce(
    (titles: TalentTitles, [id, talent]) => [
      ...titles,
      { id, title: talent.title },
    ],
    [],
  );

  return talentTitles;
}

export async function updateTalents(talents: Section[]) {
  return update(ref(database), {
    [TALENTS_DB_KEY]: talents.map(section => ({
      title: section.title,
      text: sanitizeText(section.text),
    })),
  });
}
