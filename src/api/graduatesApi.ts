import { child, get, push, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Graduates, GraduateTitles, UnsavedGraduates } from '../types';

const GRADUATES_DB_KEY = 'graduates';

export async function fetchGraduateTitles() {
  const snapshot = await get(child(ref(database), GRADUATES_DB_KEY));
  const data: Record<string, UnsavedGraduates> = snapshot.val() || {};

  const titles: GraduateTitles = Object.entries(data).reduce(
    (titles: GraduateTitles, [id, graduates]) => [
      ...titles,
      { id, title: graduates.title },
    ],
    [],
  );

  return titles;
}

export async function fetchGraduates(id: string) {
  const snapshot = await get(child(ref(database), `${GRADUATES_DB_KEY}/${id}`));
  const data: Graduates = snapshot.val();

  if (!data) return undefined;

  return { ...data, id };
}

export async function addGraduates(graduates: UnsavedGraduates) {
  const id = push(child(ref(database), GRADUATES_DB_KEY)).key;

  await update(ref(database), {
    [`${GRADUATES_DB_KEY}/${id}`]: { ...graduates, id },
  });

  return id;
}

export async function updateGraduates(graduates: Graduates) {
  await update(ref(database), {
    [`${GRADUATES_DB_KEY}/${graduates.id}`]: graduates,
  });

  return graduates.id;
}

export async function removeGraduates(id: string) {
  return update(ref(database), {
    [`${GRADUATES_DB_KEY}/${id}`]: null,
  });
}
