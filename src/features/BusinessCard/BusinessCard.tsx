import '@ckeditor/ckeditor5-build-classic/build/translations/uk';
import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import ElevationScroll from '../../components/ElevationScroll';
import TextEditor from '../../components/TextEditor';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';

interface Section {
  title: string;
  text: string;
}

interface BusinessCardType {
  title: string;
  subtitle: string;
  sections: Section[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
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
    section: {
      marginBottom: theme.spacing(2),
    },
  }),
);

function BusinessCard() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [dbCard, setDbCard] = useState<BusinessCardType>();

  const isDataChanged =
    dbCard &&
    title &&
    subtitle &&
    sections &&
    !isEqual({ title, subtitle, sections }, dbCard);

  useEffect(() => {
    db.ref(DB_KEY.businessCard).on('value', snapshot => {
      const data: BusinessCardType = snapshot.val() || {};

      setDbCard(data);

      setTitle(data.title || '');
      setSubtitle(data.subtitle || '');
      setSections(data.sections ? Object.values(data.sections) : []);
    });
  }, []);

  useEffect(() => {
    if (!dbCard) return;

    setTitle(dbCard.title || '');
    setSubtitle(dbCard.subtitle || '');
    setSections(dbCard.sections || []);
  }, [dbCard]);

  const saveBusinessCard = () =>
    db.ref().update({
      [DB_KEY.businessCardTitle]: title,
      [DB_KEY.businessCardSubtitle]: subtitle,
      [DB_KEY.businessCardSections]: sections.map(section => ({
        title: section.title,
        text: sanitizeHtml(section.text),
      })),
    });

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
            onClick={saveBusinessCard}
            disabled={!isDataChanged}
          >
            Зберегти
          </Button>
        </div>
      </ElevationScroll>
      <TextField
        label="Заголовок"
        variant="outlined"
        className={classes.marginBottom}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        label="Підзаголовок"
        variant="outlined"
        className={classes.marginBottom}
        value={subtitle}
        onChange={e => setSubtitle(e.target.value)}
      />

      <Box mb={2} mx={-3}>
        <Divider />
      </Box>

      {Object.values(sections).map((section, index) => {
        return (
          <Box display="flex" flexDirection="column" key={`section-${index}`}>
            <Box alignSelf="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                className={classes.marginBottom}
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

            <Box my={3} mx={-3}>
              <Divider />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default BusinessCard;
