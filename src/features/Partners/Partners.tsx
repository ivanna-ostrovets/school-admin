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
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';
import Partner from './Partner';
import { PartnerType, UnsavedPartner } from './types';

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

function Partners() {
  const classes = useStyles();
  const [partners, setPartners] = useState<{ [key: string]: PartnerType }>({});
  const [newPartner, setNewPartner] = useState<UnsavedPartner>(initialPartner);

  const canAddPartner = newPartner.name && newPartner.url;
  const partnersToRender = Object.values(partners);

  useEffect(() => {
    db.ref(DB_KEY.partners).on('value', snapshot => {
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

    const id = db.ref().child(DB_KEY.partners).push().key;

    await db
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
            <Partner partner={partner} />
          </div>
        ))}
      </List>
    </>
  );
}

export default Partners;
