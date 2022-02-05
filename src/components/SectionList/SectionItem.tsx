import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import React from 'react';
import TextEditor from '../TextEditor/TextEditor';
import { Section } from './sectionTypes';

interface Props {
  index: number;
  lastItem: boolean;
  section: Section;
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

function SectionItem({ index, lastItem, section, setSections }: Props) {
  return (
    <>
      <Accordion
        defaultExpanded={!section.text && !section.title}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2, py: 1 }}>
          <TextField
            autoFocus={!section.title}
            fullWidth
            label="Заголовок секції"
            value={section.title}
            variant="outlined"
            onClick={event => event.stopPropagation()}
            onChange={e => {
              const title = e.target.value;

              setSections(prevSections => [
                ...prevSections.slice(0, index),
                { ...section, title },
                ...prevSections.slice(index + 1),
              ]);
            }}
          />

          <Button
            variant="outlined"
            color="secondary"
            sx={{ mx: 2 }}
            onClick={() => {
              setSections(prevSections => [
                ...prevSections.slice(0, index),
                ...prevSections.slice(index + 1),
              ]);
            }}
          >
            Видалити
          </Button>
        </AccordionSummary>

        <AccordionDetails>
          <TextEditor
            data={section.text}
            onChange={text =>
              setSections(prevSections => [
                ...prevSections.slice(0, index),
                { ...section, text },
                ...prevSections.slice(index + 1),
              ])
            }
          />
        </AccordionDetails>
      </Accordion>

      {!lastItem && <Divider sx={{ my: 3, mx: -3 }} />}
    </>
  );
}

export default SectionItem;
