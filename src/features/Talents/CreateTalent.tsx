import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTalent } from '../../api/talentsApi';
import { APP_ROUTES } from '../../APP_ROUTES';
import ElevationScroll from '../../components/ElevationScroll';
import TextEditor from '../../components/TextEditor/TextEditor';

function CreateTalent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const canSave = title && text;

  const saveData = async () => {
    if (!canSave) return;

    const id = await addTalent({ text, title });

    if (id) return navigate(APP_ROUTES.talentView.getLink(id));

    navigate(APP_ROUTES.talents.path);
  };

  return (
    <Box display="flex" flexDirection="column">
      <ElevationScroll>
        <Button
          variant="contained"
          color="primary"
          onClick={saveData}
          disabled={!canSave}
        >
          Зберегти
        </Button>
      </ElevationScroll>

      <TextField
        autoFocus={!title}
        fullWidth
        label="Заголовок"
        value={title}
        variant="outlined"
        onChange={e => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextEditor data={text} onChange={setText} />
    </Box>
  );
}

export default CreateTalent;
