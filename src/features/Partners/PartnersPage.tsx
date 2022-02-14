import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import React, { KeyboardEvent } from 'react';
import ElevationScroll from '../../components/ElevationScroll';
import PartnerItem from './PartnerItem';
import { usePartners } from './usePartners';

const inputStyles = {
  width: '100%',
  mr: 2,
};

function PartnersPage() {
  const {
    newPartner,
    setNewPartner,
    add,
    canAddPartner,
    partners,
    setPartners,
  } = usePartners();

  const handleInputKeyPress = async ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      await add();
    }
  };

  return (
    <>
      <ElevationScroll>
        <Box display="flex" justifyContent="space-between" width="100%">
          <TextField
            label="Назва"
            variant="outlined"
            sx={inputStyles}
            value={newPartner.name}
            onChange={e =>
              setNewPartner({ ...newPartner, name: e.target.value })
            }
            onKeyPress={handleInputKeyPress}
          />

          <TextField
            label="Посилання"
            variant="outlined"
            sx={inputStyles}
            value={newPartner.url}
            onChange={e =>
              setNewPartner({ ...newPartner, url: e.target.value })
            }
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
        </Box>
      </ElevationScroll>

      {partners.length > 0 && <Divider />}

      <List>
        {partners.map(partner => (
          <div key={partner.id}>
            <PartnerItem partner={partner} setPartners={setPartners} />
          </div>
        ))}
      </List>
    </>
  );
}

export default PartnersPage;
