import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { database } from '../firebaseService';
import { BusinessCard } from '../types';
import { sanitizeText } from '../utils/sanitizeText';

export const collectionReference = collection(
  database,
  'businessCard',
) as CollectionReference<BusinessCard>;
const documentId = 'data';

export async function fetchBusinessCard() {
  const docSnap = await getDoc(doc(collectionReference, documentId));

  if (docSnap.exists()) return docSnap.data();
}

export async function updateBusinessCard(card: BusinessCard) {
  await updateDoc(doc(collectionReference, documentId), {
    title: card.title,
    subtitle: card.subtitle,
    sections: card.sections.map(section => ({
      title: section.title,
      text: sanitizeText(section.text),
    })),
  });
}
