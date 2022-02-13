import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import SectionListItem from '../../components/SectionList/SectionListItem';

interface Props {
  id: string;
  title: string;
  refetchData: () => void;
}

function TalentListItem({ id, title, refetchData }: Props) {
  const navigate = useNavigate();

  const handleTalentRemoval = async () => {
    await removeTalent(id);
    refetchData();
  };

  return (
    <SectionListItem
      title={title}
      handleRemoval={handleTalentRemoval}
      navigateToView={() => navigate(APP_ROUTES.talentView.getLink(id))}
      navigateToEdit={() => navigate(APP_ROUTES.editTalent.getLink(id))}
    />
  );
}

export default TalentListItem;
