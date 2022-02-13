import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import React, { KeyboardEvent, useState } from 'react';
import { removePartner, updatePartner } from '../../api/partnersApi';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';
import { Partner, Partners } from '../../types';

interface Props {
  partner: Partner;
  setPartners: React.Dispatch<React.SetStateAction<Partners>>;
}

function PartnerItem({ partner, setPartners }: Props) {
  const [updatedPartner, setUpdatedPartner] = useState<Partner>();
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleInputKeyPress = async ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      await update();
    }
  };

  async function update() {
    if (!updatedPartner) return;

    await updatePartner(updatedPartner);
    setPartners(prevPartners => ({
      ...prevPartners,
      [updatedPartner.id]: updatedPartner,
    }));
    cancelEditing();
  }

  const handleRemoval = async () => {
    await removePartner(partner);

    setPartners(prevPartners => {
      const { [partner.id]: _, ...newPartners } = prevPartners;
      return newPartners;
    });
  };

  const cancelEditing = () => {
    setUpdatedPartner(undefined);
  };

  if (partner.id === updatedPartner?.id) {
    return (
      <Box my={2}>
        <Box mb={2} pr={2} display="flex" justifyContent="space-between">
          <Box ml={2} width="100%">
            <TextField
              fullWidth
              label="Назва"
              value={updatedPartner.name}
              onChange={e =>
                setUpdatedPartner({
                  ...updatedPartner,
                  name: e.target.value,
                })
              }
              onKeyPress={handleInputKeyPress}
            />
          </Box>

          <Box ml={2} width="100%">
            <TextField
              fullWidth
              label="Посилання"
              value={updatedPartner.url}
              onChange={e =>
                setUpdatedPartner({
                  ...updatedPartner,
                  url: e.target.value,
                })
              }
              onKeyPress={handleInputKeyPress}
            />
          </Box>

          <IconButton onClick={update}>
            <DoneIcon />
          </IconButton>

          <IconButton onClick={cancelEditing}>
            <HighlightOffIcon />
          </IconButton>
        </Box>

        <Divider />
      </Box>
    );
  }

  return (
    <>
      <ListItem divider>
        <ListItemText
          primary={partner.name}
          secondary={
            <a href={partner.url} target="_blank" rel="noopener noreferrer">
              {partner.url}
            </a>
          }
        />

        <ListItemSecondaryAction>
          <IconButton onClick={() => setUpdatedPartner(partner)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => setConfirmDeleteOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <ConfirmDeleteDialog
        isOpen={isConfirmDeleteOpen}
        setOpen={setConfirmDeleteOpen}
        title={partner.name}
        onConfirm={handleRemoval}
      />
    </>
  );
}

export default PartnerItem;
