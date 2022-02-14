import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGraduates } from '../../api/graduatesApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import { Graduates } from '../../types';

export function useFetchGraduates() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [graduates, setGraduates] = useState<Graduates>();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const data = await fetchGraduates(id);

      if (!data) return navigate(APP_ROUTES.graduates.path);

      setGraduates(data);
    }

    fetchData();
  }, [id, navigate]);

  return [graduates, id] as const;
}
