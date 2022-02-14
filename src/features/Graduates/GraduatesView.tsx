import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeGraduates } from '../../api/graduatesApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemViewPage from '../../components/ItemViewPage/ItemViewPage';
import { useFetchGraduates } from './useFetchGraduates';

function GraduatesView() {
  const navigate = useNavigate();
  const [graduates, id] = useFetchGraduates();

  const handleGraduatesRemoval = async () => {
    await removeGraduates(id);
    navigate(APP_ROUTES.graduates.path);
  };

  if (!graduates) return null;

  return (
    <ItemViewPage
      title={graduates.title}
      text={graduates.text}
      handleRemoval={handleGraduatesRemoval}
      navigateToEdit={() => navigate(APP_ROUTES.editGraduates.getLink(id))}
    />
  );
}

export default GraduatesView;
