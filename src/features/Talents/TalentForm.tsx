import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../APP_ROUTES';
import ElevationScroll from '../../components/ElevationScroll';
import TextEditor from '../../components/TextEditor/TextEditor';
import { BaseTalent } from '../../types';

interface Props<T> {
  talent?: T;
  saveTalent: (talent: T) => Promise<string | null>;
}

function TalentForm<T extends BaseTalent>({ talent, saveTalent }: Props<T>) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (!talent) return;

    setTitle(talent.title);
    setText(talent.text);
  }, [talent]);

  const canSave = title && text;

  const saveData = async () => {
    if (!canSave) return;

    const id = await saveTalent({ ...talent, text, title } as T);

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

export default TalentForm;
