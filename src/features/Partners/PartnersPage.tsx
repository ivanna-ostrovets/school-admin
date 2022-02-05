import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import firebase from 'firebase';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import ElevationScroll from '../../components/ElevationScroll';
import { DB_KEY } from '../../databaseKeys';
import PartnerItem from './PartnerItem';
import { Partner, UnsavedPartner } from './partnerTypes';

const inputStyles = {
  width: '100%',
  mr: 2,
};

const initialPartner = { name: '', url: '' };

function PartnersPage() {
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
      <ElevationScroll>
        <TextField
          label="Назва"
          variant="outlined"
          sx={inputStyles}
          value={newPartner.name}
          onChange={e => setNewPartner({ ...newPartner, name: e.target.value })}
          onKeyPress={handleInputKeyPress}
        />

        <TextField
          label="Посилання"
          variant="outlined"
          sx={inputStyles}
          value={newPartner.url}
          onChange={e => setNewPartner({ ...newPartner, url: e.target.value })}
          onKeyPress={handleInputKeyPress}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={add}
          disabled={!canAddPartner}
          sx={{ minWidth: 100 }}
        >
          Додати
        </Button>
      </ElevationScroll>

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
