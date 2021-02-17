import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { KeyboardEvent, useState } from 'react';
import { DB_KEY } from '../../databaseKeys';
import { db } from '../../firebaseService';
import { Partner } from './partnerTypes';

function PartnerItem({ partner }: { partner: Partner }) {
  const [editedPartner, setEditedPartner] = useState<Partner>();

  const handleEditInputKeyPress = async ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      await edit();
    }
  };

  const edit = async () => {
    if (!editedPartner) return;

    await db
      .ref()
      .update({ [`${DB_KEY.partners}/${editedPartner.id}`]: editedPartner });

    cancelEditing();
  };

  const remove = (partnerToRemove: Partner) =>
    db.ref().update({ [`${DB_KEY.partners}/${partnerToRemove.id}`]: null });

  const cancelEditing = () => {
    setEditedPartner(undefined);
  };

  return partner.id === editedPartner?.id ? (
    <Box my={2}>
      <Box mb={2} pr={2} display="flex" justifyContent="space-between">
        <Box ml={2} width="100%">
          <TextField
            fullWidth
            label="Назва"
            value={editedPartner.name}
            onChange={e =>
              setEditedPartner({
                ...editedPartner,
                name: e.target.value,
              })
            }
            onKeyPress={handleEditInputKeyPress}
          />
        </Box>

        <Box ml={2} width="100%">
          <TextField
            fullWidth
            label="Посилання"
            value={editedPartner.url}
            onChange={e =>
              setEditedPartner({
                ...editedPartner,
                url: e.target.value,
              })
            }
            onKeyPress={handleEditInputKeyPress}
          />
        </Box>

        <IconButton onClick={edit}>
          <DoneIcon />
        </IconButton>

        <IconButton onClick={cancelEditing}>
          <HighlightOffIcon />
        </IconButton>
      </Box>

      <Divider />
    </Box>
  ) : (
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
        <IconButton onClick={() => setEditedPartner(partner)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => remove(partner)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default PartnerItem;
