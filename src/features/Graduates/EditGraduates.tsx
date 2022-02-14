import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateGraduates } from '../../api/graduatesApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemForm from '../../components/ItemForm';
import { useFetchGraduates } from './useFetchGraduates';

function EditGraduates() {
  const navigate = useNavigate();
  const [graduates] = useFetchGraduates();

  if (!graduates) return null;

  return (
    <ItemForm
      title={graduates.title}
      text={graduates.text}
      saveItem={(text, title) =>
        updateGraduates({ id: graduates.id, text, title })
      }
      navigateToView={id => navigate(APP_ROUTES.graduatesView.getLink(id))}
      navigateToList={() => navigate(APP_ROUTES.graduates.path)}
    />
  );
}

export default EditGraduates;
