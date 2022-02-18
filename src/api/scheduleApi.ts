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
import { Schedule, ScheduleTitles, UnsavedSchedule } from '../types';

const collectionReference = collection(
  database,
  'schedule',
) as CollectionReference<UnsavedSchedule>;

export async function fetchScheduleTitles() {
  const docsSnap = await getDocs(collectionReference);
  const titles: ScheduleTitles = [];

  docsSnap.forEach(doc => {
    titles.push({ id: doc.id, title: doc.data().title });
  });

  return titles;
}

export async function fetchSchedule(id: string) {
  const docSnap = await getDoc(doc(collectionReference, id));

  if (docSnap.exists()) return { id, ...docSnap.data() };
}

export async function addSchedule(schedule: UnsavedSchedule) {
  return (await addDoc(collectionReference, schedule)).id;
}

export async function updateSchedule({ id, ...schedule }: Schedule) {
  await updateDoc(doc(collectionReference, id), schedule);
  return id;
}

export async function removeSchedule(id: string) {
  return deleteDoc(doc(collectionReference, id));
}
