import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import xss from 'xss';
import SectionsPage from '../../components/Sections/SectionsPage';
import { SectionType } from '../../components/Sections/types';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';

function Talents() {
  const [talents, setTalents] = useState<SectionType[]>([]);
  const [dbTalents, setDbTalents] = useState<SectionType[]>([]);

  const isDataChanged = Boolean(
    dbTalents && talents && !isEqual(talents, dbTalents),
  );

  useEffect(() => {
    db.ref(DB_KEY.talents).on('value', snapshot => {
      const data: SectionType[] = snapshot.val() || [];

      setDbTalents(data);
    });
  }, []);

  useEffect(() => {
    setTalents(dbTalents);
  }, [dbTalents]);

  const saveTalents = () => {
    return db.ref().update({
      [DB_KEY.talents]: talents.map(section => ({
        title: section.title,
        text: xss(section.text),
      })),
    });
  };

  return (
    <SectionsPage
      isDataChanged={isDataChanged}
      sections={talents}
      setSections={setTalents}
      saveData={saveTalents}
    />
  );
}

export default Talents;
