import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';

interface Props {
  id: string;
  title: string;
  refetchData: () => void;
}

function TalentListItem({ id, title, refetchData }: Props) {
  const navigate = useNavigate();
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const deleteTalent = async () => {
    await removeTalent(id);
    refetchData();
  };

  return (
    <>
      <ListItem divider>
        <ListItemText primary={title} />

        <ListItemSecondaryAction>
          <IconButton
            onClick={() => navigate(APP_ROUTES.talentView.getLink(id))}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            onClick={() => navigate(APP_ROUTES.editTalent.getLink(id))}
          >
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
        onConfirm={deleteTalent}
      />
    </>
  );
}

export default TalentListItem;
