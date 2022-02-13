import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

interface Props {
  title: string;
  handleRemoval: () => Promise<void>;
  navigateToView: () => void;
  navigateToEdit: () => void;
}

function SectionListItem({
  title,
  handleRemoval,
  navigateToView,
  navigateToEdit,
}: Props) {
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <>
      <ListItem divider>
        <ListItemText primary={title} />

        <ListItemSecondaryAction>
          <IconButton onClick={navigateToView}>
            <VisibilityIcon />
          </IconButton>

          <IconButton onClick={navigateToEdit}>
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
        title={title}
        onConfirm={handleRemoval}
      />
    </>
  );
}

export default SectionListItem;
