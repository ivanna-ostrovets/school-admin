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
import TalentListItem from './TalentListItem';

function TalentsPage() {
  const [talentTitles, setTalentTitles] = useState<TalentTitles>([]);
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setTalentTitles(await fetchTalentTitles());
      setDataLoading(false);
    }

    fetchData();
  }, [isDataLoading, setDataLoading]);

  return (
    <>
      <ElevationScroll>
        <Link to={APP_ROUTES.newTalent.path}>
          <Button variant="contained" color="primary">
            Додати нову секцію
          </Button>
        </Link>
      </ElevationScroll>

      {isDataLoading && <CircularProgress />}

      {!isDataLoading && (
        <List>
          {talentTitles.length === 0 && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {talentTitles.map(item => (
            <TalentListItem
              key={item.id}
              {...item}
              refetchData={() => setDataLoading(true)}
            />
          ))}
        </List>
      )}
    </>
  );
}

export default TalentsPage;
