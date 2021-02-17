import firebase from 'firebase';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import SectionList from '../../components/SectionList/SectionList';
import { Section } from '../../components/SectionList/sectionTypes';
import { DB_KEY } from '../../databaseKeys';
import { sanitizeText } from '../../utils/sanitizeText';

function TalentsPage() {
  const [talents, setTalents] = useState<Section[]>([]);
  const [dbTalents, setDbTalents] = useState<Section[]>([]);

  const isDataChanged = Boolean(
    dbTalents && talents && !isEqual(talents, dbTalents),
  );

  useEffect(() => {
    firebase
      .database()
      .ref(DB_KEY.talents)
      .on('value', snapshot => {
        const data: Section[] = snapshot.val() || [];

        setDbTalents(data);
      });
  }, []);

  useEffect(() => {
    setTalents(dbTalents);
  }, [dbTalents]);

  const saveTalents = () => {
    return firebase
      .database()
      .ref()
      .update({
        [DB_KEY.talents]: talents.map(section => ({
          title: section.title,
          text: sanitizeText(section.text),
        })),
      });
  };

  return (
    <SectionList
      isDataChanged={isDataChanged}
      sections={talents}
      setSections={setTalents}
      saveData={saveTalents}
    />
  );
}

export default TalentsPage;
