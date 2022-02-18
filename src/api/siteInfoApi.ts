import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { database } from '../firebaseService';
import { SiteInfo } from '../types';

export const collectionReference = collection(
  database,
  'siteInfo',
) as CollectionReference<SiteInfo>;
const documentId = 'data';

export async function fetchSiteInfo() {
  const docSnap = await getDoc(doc(collectionReference, documentId));

  if (docSnap.exists()) return docSnap.data();
}

export async function updateSiteInfo(info: SiteInfo) {
  await updateDoc(doc(collectionReference, documentId), info);
}
