import {
  Box,
  Button,
  createStyles,
  Divider,
  List,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import firebase from 'firebase';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DB_KEY } from '../../databaseKeys';
import PartnerItem from './PartnerItem';
import { Partner, UnsavedPartner } from './partnerTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      width: '100%',
      marginRight: theme.spacing(2),
    },
    addPartnerButton: {
      minWidth: 100,
    },
    editInput: {
      marginLeft: theme.spacing(2),
    },
  }),
);

const initialPartner = { name: '', url: '' };

function PartnersPage() {
  const classes = useStyles();
  const [partners, setPartners] = useState<{ [key: string]: Partner }>({});
  const [newPartner, setNewPartner] = useState<UnsavedPartner>(initialPartner);

  const canAddPartner = newPartner.name && newPartner.url;
  const partnersToRender = Object.values(partners);

  useEffect(() => {
    firebase
      .database()
      .ref(DB_KEY.partners)
      .on('value', snapshot => {
        setPartners(snapshot.val() || []);
      });
  }, []);

  const handleInputKeyPress = async ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      await add();
    }
  };

  const add = async () => {
    if (!canAddPartner) return;

    const id = firebase.database().ref().child(DB_KEY.partners).push().key;

    await firebase
      .database()
      .ref()
      .update({ [`${DB_KEY.partners}/${id}`]: { ...newPartner, id } });

    setNewPartner(initialPartner);
  };

  return (
    <>
      <Box
        mb={3}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
      >
        <TextField
          label="Назва"
          variant="outlined"
          className={classes.input}
          value={newPartner.name}
          onChange={e => setNewPartner({ ...newPartner, name: e.target.value })}
          onKeyPress={handleInputKeyPress}
        />

        <TextField
          label="Посилання"
          variant="outlined"
          className={classes.input}
          value={newPartner.url}
          onChange={e => setNewPartner({ ...newPartner, url: e.target.value })}
          onKeyPress={handleInputKeyPress}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={add}
          disabled={!canAddPartner}
          className={classes.addPartnerButton}
        >
          Додати
        </Button>
      </Box>

      {partnersToRender.length > 0 && <Divider />}

      <List>
        {partnersToRender.map(partner => (
          <div key={partner.id}>
            <PartnerItem partner={partner} />
          </div>
        ))}
      </List>
    </>
  );
}

export default PartnersPage;
