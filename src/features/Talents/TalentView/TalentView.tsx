import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeTalent } from '../../../api/talentsApi';
import { APP_ROUTES } from '../../../APP_ROUTES';
import ConfirmDeleteDialog from '../../../components/ConfirmDeleteDialog';
import ElevationScroll from '../../../components/ElevationScroll';
import { sanitizeText } from '../../../utils/sanitizeText';
import styles from './TalentView.module.css';
import { useFetchTalent } from '../useFetchTalent';

function TalentView() {
  const navigate = useNavigate();
  const [talent, id] = useFetchTalent();
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleTalentRemoval = async () => {
    await removeTalent(id);
    navigate(APP_ROUTES.talents.path);
  };

  if (!talent) return <></>;

  return (
    <Box display="flex" flexDirection="column">
      <ElevationScroll>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h6">{talent.title}</Typography>

          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => navigate(APP_ROUTES.editTalent.getLink(id))}
            >
              Редагувати
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setConfirmDeleteOpen(true)}
            >
              Видалити
            </Button>
          </Box>
        </Box>
      </ElevationScroll>

      <div
        dangerouslySetInnerHTML={{ __html: sanitizeText(talent.text) }}
        className={styles.htmlWrapper}
      />

      <ConfirmDeleteDialog
        isOpen={isConfirmDeleteOpen}
        setOpen={setConfirmDeleteOpen}
        title={talent.title}
        onConfirm={handleTalentRemoval}
      />
    </Box>
  );
}

export default TalentView;
