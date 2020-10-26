import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import TextEditor from '../TextEditor/TextEditor';
import { SectionType } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginRight: {
      marginRight: theme.spacing(2),
    },
    accordion: {
      padding: theme.spacing(2),
    },
  }),
);
function Section({
  index,
  sectionsCount,
  section,
  setSections,
}: {
  index: number;
  sectionsCount: number;
  section: SectionType;
  setSections: React.Dispatch<React.SetStateAction<SectionType[]>>;
}) {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Accordion
        expanded={!section.text && !section.title}
        TransitionProps={{ unmountOnExit: true }}
        className={classes.accordion}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box display="flex" flexGrow={1}>
            <TextField
              autoFocus={!section.title}
              fullWidth
              label="Заголовок секції"
              className={classes.marginRight}
              value={section.title}
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
              className={classes.marginRight}
              onClick={() => {
                setSections(prevSections => [
                  ...prevSections.slice(0, index),
                  ...prevSections.slice(index + 1),
                ]);
              }}
            >
              Видалити
            </Button>
          </Box>
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

      {index + 1 !== sectionsCount && (
        <Box my={3} mx={-3}>
          <Divider />
        </Box>
      )}
    </Box>
  );
}

export default Section;
