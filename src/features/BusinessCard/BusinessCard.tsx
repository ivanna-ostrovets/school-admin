import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import SectionsPage from '../../components/Sections/SectionsPage';
import { SectionType } from '../../components/Sections/types';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';
import { sanitizeText } from '../../utils/sanitizeText';

interface BusinessCardType {
  title: string;
  subtitle: string;
  sections: SectionType[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(2),
    },
  }),
);

function BusinessCard() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sections, setSections] = useState<SectionType[]>([]);
  const [dbCard, setDbCard] = useState<BusinessCardType>();

  const isDataChanged = Boolean(
    dbCard &&
      title &&
      subtitle &&
      sections &&
      !isEqual({ title, subtitle, sections }, dbCard),
  );

  useEffect(() => {
    db.ref(DB_KEY.businessCard).on('value', snapshot => {
      const data: BusinessCardType = snapshot.val() || {};

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
    db.ref().update({
      [DB_KEY.businessCardTitle]: title,
      [DB_KEY.businessCardSubtitle]: subtitle,
      [DB_KEY.businessCardSections]: sections.map(section => ({
        title: section.title,
        text: sanitizeText(section.text),
      })),
    });

  return (
    <SectionsPage
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
    </SectionsPage>
  );
}

export default BusinessCard;
