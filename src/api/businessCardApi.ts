import { child, get, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { BusinessCard } from '../types';
import { sanitizeText } from '../utils/sanitizeText';

const BUSINESS_CARD_DB_KEY = 'businessCard';
const BUSINESS_CARD_TITLE_DB_KEY = `${BUSINESS_CARD_DB_KEY}/title`;
const BUSINESS_CARD_SUBTITLE_DB_KEY = `${BUSINESS_CARD_DB_KEY}/subtitle`;
const BUSINESS_CARD_SECTIONS_DB_KEY = `${BUSINESS_CARD_DB_KEY}/sections`;

export async function fetchBusinessCard() {
  const snapshot = await get(child(ref(database), BUSINESS_CARD_DB_KEY));
  const data: BusinessCard = snapshot.val() || {};

  return data;
}

export async function updateBusinessCard(card: BusinessCard) {
  return update(ref(database), {
    [BUSINESS_CARD_TITLE_DB_KEY]: card.title,
    [BUSINESS_CARD_SUBTITLE_DB_KEY]: card.subtitle,
    [BUSINESS_CARD_SECTIONS_DB_KEY]: card.sections.map(section => ({
      title: section.title,
      text: sanitizeText(section.text),
    })),
  });
}
