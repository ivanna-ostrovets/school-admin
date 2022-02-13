import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemForm from '../../components/ItemForm';

function CreateTalent() {
  const navigate = useNavigate();

  return (
    <ItemForm
      saveItem={(text, title) => addTalent({ text, title })}
      navigateToView={id => navigate(APP_ROUTES.talentView.getLink(id))}
      navigateToList={() => navigate(APP_ROUTES.talents.path)}
    />
  );
}

export default CreateTalent;
