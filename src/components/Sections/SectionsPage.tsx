import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import ElevationScroll from '../ElevationScroll';
import Section from './Section';
import { SectionType } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionsBar: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexShrink: 0,
      height: theme.spacing(8),
      margin: `-${theme.spacing(3)}`,
      marginBottom: theme.spacing(3),
      paddingRight: theme.spacing(3),
      backgroundColor: 'white',
      boxShadow: theme.shadows[1],
    },
  }),
);

// TODO: remove word Icon from icon names
// TODO: expand/collapse sections
function SectionsPage({
  isDataChanged,
  sections,
  setSections,
  saveData,
  children,
}: {
  isDataChanged: boolean;
  sections: SectionType[];
  setSections: React.Dispatch<React.SetStateAction<SectionType[]>>;
  saveData: () => void;
  children?: React.ReactNode;
}) {
  const classes = useStyles();

  useEffect(() => {
    const showPrompt = async (event: any) => {
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
        <div className={classes.actionsBar}>
          <Box mr={2}>
            <Button variant="outlined" color="primary" onClick={addNewSection}>
              Додати секцію
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={saveData}
            disabled={!isDataChanged}
          >
            Зберегти
          </Button>
        </div>
      </ElevationScroll>

      {children}

      {children && (
        <Box mb={2} mx={-3}>
          <Divider />
        </Box>
      )}

      {Object.values(sections).map((section, index) => (
        <Section
          key={`section-${index}`}
          section={section}
          setSections={setSections}
          index={index}
          sectionsCount={sections.length}
        />
      ))}

      <Prompt
        when={isDataChanged}
        message="Ви впевнені, що хочете залишити сторінку? У вас є незбережені зміни!"
      />
    </Box>
  );
}

export default SectionsPage;
