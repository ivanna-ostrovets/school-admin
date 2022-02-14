import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addGraduates } from '../../api/graduatesApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemForm from '../../components/ItemForm';

function CreateGraduates() {
  const navigate = useNavigate();

  return (
    <ItemForm
      saveItem={(text, title) => addGraduates({ text, title })}
      navigateToView={id => navigate(APP_ROUTES.graduatesView.getLink(id))}
      navigateToList={() => navigate(APP_ROUTES.graduates.path)}
    />
  );
}

export default CreateGraduates;
