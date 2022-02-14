import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeSchedule } from '../../api/scheduleApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import SectionListItem from '../../components/SectionListItem';

interface Props {
  id: string;
  title: string;
  refetchData: () => void;
}

function ScheduleListItem({ id, title, refetchData }: Props) {
  const navigate = useNavigate();

  const handleScheduleRemoval = async () => {
    await removeSchedule(id);
    refetchData();
  };

  return (
    <SectionListItem
      title={title}
      handleRemoval={handleScheduleRemoval}
      navigateToView={() => navigate(APP_ROUTES.scheduleView.getLink(id))}
      navigateToEdit={() => navigate(APP_ROUTES.editSchedule.getLink(id))}
    />
  );
}

export default ScheduleListItem;
