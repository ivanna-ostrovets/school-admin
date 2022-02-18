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
import { Graduates, GraduateTitles, UnsavedGraduates } from '../types';

const collectionReference = collection(
  database,
  'graduates',
) as CollectionReference<UnsavedGraduates>;

export async function fetchGraduateTitles() {
  const docsSnap = await getDocs(collectionReference);
  const titles: GraduateTitles = [];

  docsSnap.forEach(doc => {
    titles.push({ id: doc.id, title: doc.data().title });
  });

  return titles;
}

export async function fetchGraduates(id: string) {
  const docSnap = await getDoc(doc(collectionReference, id));

  if (docSnap.exists()) return { id, ...docSnap.data() };
}

export async function addGraduates(graduates: UnsavedGraduates) {
  return (await addDoc(collectionReference, graduates)).id;
}

export async function updateGraduates({ id, ...graduates }: Graduates) {
  await updateDoc(doc(collectionReference, id), graduates);
  return id;
}

export async function removeGraduates(id: string) {
  return deleteDoc(doc(collectionReference, id));
}
