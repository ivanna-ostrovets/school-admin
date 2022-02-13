import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTalent } from '../../api/talentsApi';
import ElevationScroll from '../../components/ElevationScroll';
import { Talent } from '../../types';
import { sanitizeText } from '../../utils/sanitizeText';
import styles from './TalentView.module.css';

function TalentView() {
  const navigate = useNavigate();
  let { id = '' } = useParams();

  const [talent, setTalent] = useState<Talent>();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setTalent(await fetchTalent(id));
    }

    fetchData();
  }, [id]);

  return (
    <Box display="flex" flexDirection="column">
      <ElevationScroll>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h6">{talent?.title}</Typography>

          <Button variant="contained" color="primary" onClick={() => {}}>
            Редагувати
          </Button>
        </Box>
      </ElevationScroll>

      {talent?.text && (
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeText(talent.text) }}
          className={styles.htmlWrapper}
        />
      )}
    </Box>
  );
}

export default TalentView;
