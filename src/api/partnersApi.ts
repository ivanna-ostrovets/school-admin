import { child, get, push, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Partner, Partners, UnsavedPartner } from '../types';

const PARTNERS_DB_KEY = 'partners';

export async function fetchPartners() {
  const snapshot = await get(child(ref(database), PARTNERS_DB_KEY));
  const data: Partners = snapshot.val() || {};

  return data;
}

export async function addPartner(partner: UnsavedPartner) {
  const id = push(child(ref(database), PARTNERS_DB_KEY)).key;

  await update(ref(database), {
    [`${PARTNERS_DB_KEY}/${id}`]: { ...partner, id },
  });

  return id;
}

export async function updatePartner(partner: Partner) {
  return update(ref(database), {
    [`${PARTNERS_DB_KEY}/${partner.id}`]: partner,
  });
}

export async function removePartner(partner: Partner) {
  return update(ref(database), {
    [`${PARTNERS_DB_KEY}/${partner.id}`]: null,
  });
}
