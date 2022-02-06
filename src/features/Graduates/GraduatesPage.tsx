import React from 'react';
import SectionList from '../../components/SectionList/SectionList';
import { useGraduates } from './useGraduates';

function GraduatesPage() {
  const { graduates, setGraduates, isDataChanged, saveData } = useGraduates();

  return (
    <SectionList
      isDataChanged={isDataChanged}
      sections={graduates}
      setSections={setGraduates}
      saveData={saveData}
    />
  );
}

export default GraduatesPage;
