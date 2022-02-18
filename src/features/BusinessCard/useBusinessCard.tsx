import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import {
  fetchBusinessCard,
  updateBusinessCard,
} from '../../api/businessCardApi';
import { BusinessCard, Section } from '../../types';

export function useBusinessCard() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [dbCard, setDbCard] = useState<BusinessCard>({} as BusinessCard);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBusinessCard();
      if (data) setDbCard(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!dbCard) return;

    setTitle(dbCard.title || '');
    setSubtitle(dbCard.subtitle || '');
    setSections(dbCard.sections || []);
  }, [dbCard]);

  const isDataChanged = Boolean(
    dbCard &&
      title &&
      subtitle &&
      sections &&
      !isEqual({ title, subtitle, sections }, dbCard),
  );

  const saveData = () => updateBusinessCard({ title, subtitle, sections });

  return {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    sections,
    setSections,
    isDataChanged,
    saveData,
  };
}
