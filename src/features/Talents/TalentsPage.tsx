import React from 'react';
import SectionList from '../../components/SectionList/SectionList';
import { useTalents } from './useTalents';

function TalentsPage() {
  const { talents, setTalents, isDataChanged, saveData } = useTalents();

  return (
    <SectionList
      isDataChanged={isDataChanged}
      sections={talents}
      setSections={setTalents}
      saveData={saveData}
    />
  );
}

export default TalentsPage;
