import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGraduateTitles } from '../../api/graduatesApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ElevationScroll from '../../components/ElevationScroll';
import { GraduateTitles } from '../../types';
import GraduateListItem from './GraduateListItem';

function GraduatesPage() {
  const [graduatesTitles, setGraduatesTitles] = useState<GraduateTitles>([]);
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setGraduatesTitles(await fetchGraduateTitles());
      setDataLoading(false);
    }

    fetchData();
  }, [isDataLoading, setDataLoading]);

  return (
    <>
      <ElevationScroll>
        <Link to={APP_ROUTES.newGraduates.path}>
          <Button variant="contained" color="primary">
            Додати нову секцію
          </Button>
        </Link>
      </ElevationScroll>

      {isDataLoading && <CircularProgress />}

      {!isDataLoading && (
        <List>
          {graduatesTitles.length === 0 && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {graduatesTitles.map(item => (
            <GraduateListItem
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

export default GraduatesPage;
