import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import { fetchGraduates, updateGraduates } from '../../api/graduatesApi';
import { Section } from '../../types';

export function useGraduates() {
  const [dbGraduates, setDbGraduates] = useState<Section[]>([]);
  const [graduates, setGraduates] = useState<Section[]>([]);

  useEffect(() => {
    async function fetchData() {
      setDbGraduates(await fetchGraduates());
    }

    fetchData();
  }, []);

  const isDataChanged = Boolean(
    dbGraduates && graduates && !isEqual(graduates, dbGraduates),
  );

  const saveData = () => updateGraduates(graduates);

  useEffect(() => {
    setGraduates(dbGraduates);
  }, [dbGraduates]);

  return { graduates, setGraduates, isDataChanged, saveData };
}
