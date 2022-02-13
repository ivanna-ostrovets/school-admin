import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemForm from '../../components/ItemForm';
import { useFetchTalent } from './useFetchTalent';

function EditTalent() {
  const navigate = useNavigate();
  const [talent] = useFetchTalent();

  if (!talent) return null;

  return (
    <ItemForm
      title={talent.title}
      text={talent.text}
      saveItem={(text, title) => updateTalent({ id: talent.id, text, title })}
      navigateToView={id => navigate(APP_ROUTES.talentView.getLink(id))}
      navigateToList={() => navigate(APP_ROUTES.talents.path)}
    />
  );
}

export default EditTalent;
