import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import firebase from 'firebase';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import SectionList from '../../components/SectionList/SectionList';
import { Section } from '../../components/SectionList/sectionTypes';
import { DB_KEY } from '../../databaseKeys';
import { sanitizeText } from '../../utils/sanitizeText';

interface BusinessCard {
  title: string;
  subtitle: string;
  sections: Section[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(2),
    },
  }),
);

function BusinessCardPage() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [dbCard, setDbCard] = useState<BusinessCard>();

  const isDataChanged = Boolean(
    dbCard &&
      title &&
      subtitle &&
      sections &&
      !isEqual({ title, subtitle, sections }, dbCard),
  );

  useEffect(() => {
    firebase
      .database()
      .ref(DB_KEY.businessCard)
      .on('value', snapshot => {
        const data: BusinessCard = snapshot.val() || {};

        setDbCard(data);
      });
  }, []);

  useEffect(() => {
    if (!dbCard) return;

    setTitle(dbCard.title || '');
    setSubtitle(dbCard.subtitle || '');
    setSections(dbCard.sections || []);
  }, [dbCard]);

  const saveBusinessCard = () =>
    firebase
      .database()
      .ref()
      .update({
        [DB_KEY.businessCardTitle]: title,
        [DB_KEY.businessCardSubtitle]: subtitle,
        [DB_KEY.businessCardSections]: sections.map(section => ({
          title: section.title,
          text: sanitizeText(section.text),
        })),
      });

  return (
    <SectionList
      isDataChanged={isDataChanged}
      sections={sections}
      setSections={setSections}
      saveData={saveBusinessCard}
    >
      <TextField
        label="Заголовок"
        variant="outlined"
        className={classes.input}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        label="Підзаголовок"
        variant="outlined"
        className={classes.input}
        value={subtitle}
        onChange={e => setSubtitle(e.target.value)}
      />
    </SectionList>
  );
}

export default BusinessCardPage;
