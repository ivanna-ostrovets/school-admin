import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { updateTalents } from '../../api/talentsApi';
import { Section } from '../../types';

export function useTalents() {
  const [talents, setTalents] = useState<Section[]>([]);
  const [dbTalents, setDbTalents] = useState<Section[]>([]);

  useEffect(() => {
    async function fetchData() {
      // setDbTalents(await fetchTalentTitles());
    }

    fetchData();
  }, []);

  useEffect(() => {
    setTalents(dbTalents);
  }, [dbTalents]);

  const saveData = () => {
    return updateTalents(talents);
  };

  const isDataChanged = Boolean(
    dbTalents && talents && !isEqual(talents, dbTalents),
  );

  return {
    talents,
    setTalents,
    isDataChanged,
    saveData,
  };
}
