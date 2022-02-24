import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';

interface Props {
  url: string;
  onDelete: () => void;
}

function ImagePreview({ url, onDelete }: Props) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          maxWidth: 300,
          position: 'relative',
          cursor: 'pointer',
          img: {
            objectFit: 'cover',
            boxShadow: 2,
            borderRadius: 2,
          },
        }}
      >
        <img
          src={url}
          width={200}
          height={200}
          onClick={() => setModalOpen(true)}
          onLoad={() => setImageLoaded(true)}
        />

        {isImageLoaded && (
          <Fab
            color="secondary"
            size="small"
            onClick={onDelete}
            sx={{ position: 'absolute', top: -12, right: -12 }}
          >
            <DeleteIcon />
          </Fab>
        )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <img src={url} />
      </Modal>
    </>
  );
}

export default ImagePreview;
