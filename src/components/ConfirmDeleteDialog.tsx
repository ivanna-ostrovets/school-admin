import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
  title: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => Promise<void>;
}

function ConfirmDeleteDialog({ title, isOpen, setOpen, onConfirm }: Props) {
  const closeDialog = () => setOpen(false);

  const handleConfirm = async () => {
    closeDialog();
    await onConfirm();
  };

  return (
    <Dialog open={isOpen} keepMounted onClose={closeDialog}>
      <DialogTitle>Видалити секцію "{title}"?</DialogTitle>

      <DialogActions>
        <Button autoFocus onClick={closeDialog}>
          Відмінити
        </Button>
        <Button onClick={handleConfirm}>Ок</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
