import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { database } from '../firebaseService';
import { Partner, Partners, UnsavedPartner } from '../types';

const collectionReference = collection(
  database,
  'partners',
) as CollectionReference<UnsavedPartner>;

export async function fetchPartners() {
  const docsSnap = await getDocs(collectionReference);
  const partners: Partners = {};

  docsSnap.forEach(doc => {
    partners[doc.id] = { id: doc.id, ...doc.data() };
  });

  return partners;
}

export async function addPartner(partner: UnsavedPartner) {
  return (await addDoc(collectionReference, partner)).id;
}

export async function updatePartner({ id, ...partner }: Partner) {
  await updateDoc(doc(collectionReference, id), partner);
  return id;
}

export async function removePartner(id: string) {
  return deleteDoc(doc(collectionReference, id));
}
