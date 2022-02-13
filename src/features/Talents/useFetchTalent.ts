import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import { Talent } from '../../types';

export function useFetchTalent() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const [talent, setTalent] = useState<Talent>();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const data = await fetchTalent(id);

      if (!data) return navigate(APP_ROUTES.talents.path);

      setTalent(data);
    }

    fetchData();
  }, [id, navigate]);

  return [talent, id] as const;
}
