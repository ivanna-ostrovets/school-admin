import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import React, { useEffect } from 'react';
import { Section } from '../../types';
import ElevationScroll from '../ElevationScroll';
import SectionItem from './SectionItem';

interface Props {
  isDataChanged: boolean;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  saveData: () => Promise<void>;
  children?: React.ReactNode;
}

// TODO: add Prompt when leaving
// TODO: add loading while saving

function SectionList({
  isDataChanged,
  sections,
  setSections,
  saveData,
  children,
}: Props) {
  useEffect(() => {
    const showPrompt = async (event: BeforeUnloadEvent) => {
      if (isDataChanged) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', showPrompt);

    return () => {
      window.removeEventListener('beforeunload', showPrompt);
    };
  }, [isDataChanged]);

  const addNewSection = () => {
    setSections(prevSections => [...prevSections, { title: '', text: '' }]);
  };

  return (
    <Box display="flex" flexDirection="column">
      <ElevationScroll>
        <Button
          variant="outlined"
          color="primary"
          onClick={addNewSection}
          sx={{ mr: 2 }}
        >
          Додати секцію
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={saveData}
          disabled={!isDataChanged}
        >
          Зберегти
        </Button>
      </ElevationScroll>

      {children}

      {children && <Divider sx={{ mb: 2, mx: -3 }} />}

      {sections.map((section, index) => (
        <SectionItem
          key={`section-${index}`}
          section={section}
          setSections={setSections}
          index={index}
          lastItem={index + 1 === sections.length}
        />
      ))}

      {/*<Prompt*/}
      {/*  when={isDataChanged}*/}
      {/*  message="Ви впевнені, що хочете залишити сторінку? У вас є незбережені зміни!"*/}
      {/*/>*/}
    </Box>
  );
}

export default SectionList;
