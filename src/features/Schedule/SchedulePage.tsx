import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchScheduleTitles } from '../../api/scheduleApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ElevationScroll from '../../components/ElevationScroll';
import { ScheduleTitles } from '../../types';
import ScheduleListItem from './ScheduleListItem';

function SchedulePage() {
  const [scheduleTitles, setScheduleTitles] = useState<ScheduleTitles>([]);
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setScheduleTitles(await fetchScheduleTitles());
      setDataLoading(false);
    }

    fetchData();
  }, [isDataLoading, setDataLoading]);

  return (
    <>
      <ElevationScroll>
        <Link to={APP_ROUTES.newSchedule.path}>
          <Button variant="contained" color="primary">
            Додати нову секцію
          </Button>
        </Link>
      </ElevationScroll>

      {isDataLoading && <CircularProgress />}

      {!isDataLoading && (
        <List>
          {scheduleTitles.length === 0 && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {scheduleTitles.map(item => (
            <ScheduleListItem
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

export default SchedulePage;
