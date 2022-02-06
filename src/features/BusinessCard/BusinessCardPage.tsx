import TextField from '@mui/material/TextField';
import React from 'react';
import SectionList from '../../components/SectionList/SectionList';
import { useBusinessCard } from './useBusinessCard';

function BusinessCardPage() {
  const {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    sections,
    setSections,
    isDataChanged,
    saveData,
  } = useBusinessCard();

  return (
    <SectionList
      isDataChanged={isDataChanged}
      sections={sections}
      setSections={setSections}
      saveData={saveData}
    >
      <TextField
        label="Заголовок"
        variant="outlined"
        sx={{ mb: 2 }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        label="Підзаголовок"
        variant="outlined"
        sx={{ mb: 2 }}
        value={subtitle}
        onChange={e => setSubtitle(e.target.value)}
      />
    </SectionList>
  );
}

export default BusinessCardPage;
