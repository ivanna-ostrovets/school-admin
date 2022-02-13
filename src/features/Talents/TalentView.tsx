import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../APP_ROUTES';
import ElevationScroll from '../../components/ElevationScroll';
import { sanitizeText } from '../../utils/sanitizeText';
import styles from './TalentView.module.css';
import { useTalent } from './useTalent';

function TalentView() {
  const navigate = useNavigate();
  const [talent, id] = useTalent();

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

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(APP_ROUTES.editTalent.getLink(id))}
          >
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
