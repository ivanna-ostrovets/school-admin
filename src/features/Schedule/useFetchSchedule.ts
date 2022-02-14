import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSchedule } from '../../api/scheduleApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import { Schedule } from '../../types';

export function useFetchSchedule() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<Schedule>();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const data = await fetchSchedule(id);

      if (!data) return navigate(APP_ROUTES.schedule.path);

      setSchedule(data);
    }

    fetchData();
  }, [id, navigate]);

  return [schedule, id] as const;
}
