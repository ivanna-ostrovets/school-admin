import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTalent } from '../../api/talentsApi';
import { Talent } from '../../types';

export function useTalent() {
  let { id = '' } = useParams();

  const [talent, setTalent] = useState<Talent>();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setTalent(await fetchTalent(id));
    }

    fetchData();
  }, [id]);

  return [talent, id] as const;
}
