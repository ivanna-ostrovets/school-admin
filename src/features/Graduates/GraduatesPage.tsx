import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import SectionList from '../../components/SectionList/SectionList';
import { Section } from '../../components/SectionList/sectionTypes';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';
import { sanitizeText } from '../../utils/sanitizeText';

function GraduatesPage() {
  const [graduates, setGraduates] = useState<Section[]>([]);
  const [dbGraduates, setDbGraduates] = useState<Section[]>([]);

  const isDataChanged = Boolean(
    dbGraduates && graduates && !isEqual(graduates, dbGraduates),
  );

  useEffect(() => {
    db.ref(DB_KEY.graduates).on('value', snapshot => {
      const data: Section[] = snapshot.val() || [];

      setDbGraduates(data);
    });
  }, []);

  useEffect(() => {
    setGraduates(dbGraduates);
  }, [dbGraduates]);

  const saveGraduates = () => {
    return db.ref().update({
      [DB_KEY.graduates]: graduates.map(section => ({
        title: section.title,
        text: sanitizeText(section.text),
      })),
    });
  };

  return (
    <SectionList
      isDataChanged={isDataChanged}
      sections={graduates}
      setSections={setGraduates}
      saveData={saveGraduates}
    />
  );
}

export default GraduatesPage;
