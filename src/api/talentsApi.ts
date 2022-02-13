import { child, get, push, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Talent, TalentTitles, UnsavedTalent } from '../types';

const TALENTS_DB_KEY = 'talents';

export async function fetchTalentTitles() {
  const snapshot = await get(child(ref(database), TALENTS_DB_KEY));
  const data: Record<string, UnsavedTalent> = snapshot.val() || {};

  const talentTitles: TalentTitles = Object.entries(data).reduce(
    (titles: TalentTitles, [id, talent]) => [
      ...titles,
      { id, title: talent.title },
    ],
    [],
  );

  return talentTitles;
}

export async function fetchTalent(id: string) {
  const snapshot = await get(child(ref(database), `${TALENTS_DB_KEY}/${id}`));
  const data: Talent = snapshot.val();

  if (!data) return undefined;

  return { ...data, id };
}

export async function addTalent(talent: UnsavedTalent) {
  const id = push(child(ref(database), TALENTS_DB_KEY)).key;

  await update(ref(database), {
    [`${TALENTS_DB_KEY}/${id}`]: { ...talent, id },
  });

  return id;
}

export async function updateTalent(talent: Talent) {
  await update(ref(database), {
    [`${TALENTS_DB_KEY}/${talent.id}`]: talent,
  });

  return talent.id;
}

export async function removeTalent(id: string) {
  return update(ref(database), {
    [`${TALENTS_DB_KEY}/${id}`]: null,
  });
}
