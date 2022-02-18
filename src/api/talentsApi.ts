import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { database } from '../firebaseService';
import { Talent, TalentTitles, UnsavedTalent } from '../types';

const collectionReference = collection(
  database,
  'talents',
) as CollectionReference<UnsavedTalent>;

export async function fetchTalentTitles() {
  const docsSnap = await getDocs(collectionReference);
  const titles: TalentTitles = [];

  docsSnap.forEach(doc => {
    titles.push({ id: doc.id, title: doc.data().title });
  });

  return titles;
}

export async function fetchTalent(id: string) {
  const docSnap = await getDoc(doc(collectionReference, id));

  if (docSnap.exists()) return { id, ...docSnap.data() };
}

export async function addTalent(talent: UnsavedTalent) {
  return (await addDoc(collectionReference, talent)).id;
}

export async function updateTalent({ id, ...talent }: Talent) {
  await updateDoc(doc(collectionReference, id), talent);
  return id;
}

export async function removeTalent(id: string) {
  return deleteDoc(doc(collectionReference, id));
}
