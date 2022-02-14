import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSchedule } from '../../api/scheduleApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemForm from '../../components/ItemForm';
import { useFetchSchedule } from './useFetchSchedule';

function EditSchedule() {
  const navigate = useNavigate();
  const [schedule] = useFetchSchedule();

  if (!schedule) return null;

  return (
    <ItemForm
      title={schedule.title}
      text={schedule.text}
      saveItem={(text, title) =>
        updateSchedule({ id: schedule.id, text, title })
      }
      navigateToView={id => navigate(APP_ROUTES.scheduleView.getLink(id))}
      navigateToList={() => navigate(APP_ROUTES.schedule.path)}
    />
  );
}

export default EditSchedule;
