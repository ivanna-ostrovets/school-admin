import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addSchedule } from '../../api/scheduleApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ItemForm from '../../components/ItemForm';

function CreateSchedule() {
  const navigate = useNavigate();

  return (
    <ItemForm
      saveItem={(text, title) => addSchedule({ text, title })}
      navigateToView={id => navigate(APP_ROUTES.scheduleView.getLink(id))}
      navigateToList={() => navigate(APP_ROUTES.schedule.path)}
    />
  );
}

export default CreateSchedule;
