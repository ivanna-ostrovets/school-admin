import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeGraduates } from '../../api/graduatesApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import SectionListItem from '../../components/SectionListItem';

interface Props {
  id: string;
  title: string;
  refetchData: () => void;
}

function GraduatesListItem({ id, title, refetchData }: Props) {
  const navigate = useNavigate();

  const handleGraduatesRemoval = async () => {
    await removeGraduates(id);
    refetchData();
  };

  return (
    <SectionListItem
      title={title}
      handleRemoval={handleGraduatesRemoval}
      navigateToView={() => navigate(APP_ROUTES.graduatesView.getLink(id))}
      navigateToEdit={() => navigate(APP_ROUTES.editGraduates.getLink(id))}
    />
  );
}

export default GraduatesListItem;
