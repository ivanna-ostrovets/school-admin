import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import React from 'react';
import TextEditor from '../TextEditor/TextEditor';
import { SectionType } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginBottom: {
      marginBottom: theme.spacing(2),
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
      <Box alignSelf="flex-end" mb={2}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setSections(prevSections => [
              ...prevSections.slice(0, index),
              ...prevSections.slice(index + 1),
            ]);
          }}
        >
          Видалити секцію
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Заголовок секції"
        variant="outlined"
        className={classes.marginBottom}
        value={section.title}
        onChange={e => {
          const title = e.target.value;

          setSections(prevSections => [
            ...prevSections.slice(0, index),
            { ...section, title },
            ...prevSections.slice(index + 1),
          ]);
        }}
      />

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

      {index + 1 !== sectionsCount && (
        <Box my={3} mx={-3}>
          <Divider />
        </Box>
      )}
    </Box>
  );
}

export default Section;
