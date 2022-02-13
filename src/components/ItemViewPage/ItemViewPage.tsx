import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { sanitizeText } from '../../utils/sanitizeText';
import ConfirmDeleteDialog from '../ConfirmDeleteDialog';
import ElevationScroll from '../ElevationScroll';
import styles from './ItemViewPage.module.css';

interface Props {
  title: string;
  text: string;
  handleRemoval: () => Promise<void>;
  navigateToEdit: () => void;
}

function ItemViewPage({ title, text, handleRemoval, navigateToEdit }: Props) {
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      <ElevationScroll>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h6">{title}</Typography>

          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={navigateToEdit}
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
        dangerouslySetInnerHTML={{ __html: sanitizeText(text) }}
        className={styles.htmlWrapper}
      />

      <ConfirmDeleteDialog
        isOpen={isConfirmDeleteOpen}
        setOpen={setConfirmDeleteOpen}
        title={title}
        onConfirm={handleRemoval}
      />
    </Box>
  );
}

export default ItemViewPage;
