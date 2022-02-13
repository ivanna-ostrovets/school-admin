import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemViewPage from '../../components/ItemViewPage/ItemViewPage';
import { useFetchTalent } from './useFetchTalent';

function TalentView() {
  const navigate = useNavigate();
  const [talent, id] = useFetchTalent();

  const handleTalentRemoval = async () => {
    await removeTalent(id);
    navigate(APP_ROUTES.talents.path);
  };

  if (!talent) return null;

  return (
    <ItemViewPage
      title={talent.title}
      text={talent.text}
      handleRemoval={handleTalentRemoval}
      navigateToEdit={() => navigate(APP_ROUTES.editTalent.getLink(id))}
    />
  );
}

export default TalentView;
