import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeSchedule } from '../../api/scheduleApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemViewPage from '../../components/ItemViewPage/ItemViewPage';
import { useFetchSchedule } from './useFetchSchedule';

function ScheduleView() {
  const navigate = useNavigate();
  const [schedule, id] = useFetchSchedule();

  const handleScheduleRemoval = async () => {
    await removeSchedule(id);
    navigate(APP_ROUTES.schedule.path);
  };

  if (!schedule) return null;

  return (
    <ItemViewPage
      title={schedule.title}
      text={schedule.text}
      handleRemoval={handleScheduleRemoval}
      navigateToEdit={() => navigate(APP_ROUTES.editSchedule.getLink(id))}
    />
  );
}

export default ScheduleView;
