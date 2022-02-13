import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../APP_ROUTES';

interface Props {
  id: string;
  title: string;
}

function TalentTableItem({ id, title }: Props) {
  const navigate = useNavigate();

  return (
    <ListItem divider>
      <ListItemText primary={title} />

      <ListItemSecondaryAction>
        <IconButton onClick={() => navigate(APP_ROUTES.talentView.getLink(id))}>
          <VisibilityIcon />
        </IconButton>

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
