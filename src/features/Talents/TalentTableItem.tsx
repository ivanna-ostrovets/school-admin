import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

interface Props {
  id: string;
  title: string;
}

function TalentTableItem({ id, title }: Props) {
  return (
    <ListItem divider>
      <ListItemText primary={title} />

      <ListItemSecondaryAction>
        <IconButton onClick={() => {}}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TalentTableItem;
