import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import xss from 'xss';
import SectionsPage from '../../components/Sections/SectionsPage';
import { SectionType } from '../../components/Sections/types';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';

function Graduates() {
  const [graduates, setGraduates] = useState<SectionType[]>([]);
  const [dbGraduates, setDbGraduates] = useState<SectionType[]>([]);

  const isDataChanged = Boolean(
    dbGraduates && graduates && !isEqual(graduates, dbGraduates),
  );

  useEffect(() => {
    db.ref(DB_KEY.graduates).on('value', snapshot => {
      const data: SectionType[] = snapshot.val() || [];

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
        text: xss(section.text.replace(/\n/g, '')),
      })),
    });
  };

  return (
    <SectionsPage
      isDataChanged={isDataChanged}
      sections={graduates}
      setSections={setGraduates}
      saveData={saveGraduates}
    />
  );
}

export default Graduates;
