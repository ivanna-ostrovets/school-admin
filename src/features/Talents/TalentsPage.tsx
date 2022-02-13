import Button from '@mui/material/Button';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { fetchTalentTitles } from '../../api/talentsApi';
import ElevationScroll from '../../components/ElevationScroll';
import { TalentTitles } from '../../types';
import TalentTableItem from './TalentTableItem';

function TalentsPage() {
  const [talentTitles, setTalentTitles] = useState<TalentTitles>([]);

  useEffect(() => {
    async function fetchData() {
      setTalentTitles(await fetchTalentTitles());
    }

    fetchData();
  }, []);

  return (
    <>
      <ElevationScroll>
        <Button variant="contained" color="primary">
          Додати нову секцію
        </Button>
      </ElevationScroll>

      <List>
        {talentTitles.map(item => (
          <TalentTableItem key={item.id} {...item} />
        ))}
      </List>
    </>
  );
}

export default TalentsPage;
