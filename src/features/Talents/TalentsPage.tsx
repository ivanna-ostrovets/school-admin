import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTalentTitles } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
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
        <Link to={APP_ROUTES.newTalent.path}>
          <Button variant="contained" color="primary">
            Додати нову секцію
          </Button>
        </Link>
      </ElevationScroll>

      <List>
        {talentTitles.length === 0 && (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {talentTitles.map(item => (
          <TalentTableItem key={item.id} {...item} />
        ))}
      </List>
    </>
  );
}

export default TalentsPage;
