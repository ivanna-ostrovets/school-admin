import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import ElevationScroll from './ElevationScroll';
import TextEditor from './TextEditor/TextEditor';

interface Props {
  title?: string;
  text?: string;
  saveItem: (title: string, text: string) => Promise<string | null>;
  navigateToView: (id: string) => void;
  navigateToList: () => void;
}

function ItemForm({
  saveItem,
  navigateToView,
  navigateToList,
  ...props
}: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (!props.title || !props.text) return;

    setTitle(props.title);
    setText(props.text);
  }, [props.title, props.text]);

  const saveData = async () => {
    const id = await saveItem(text, title);

    if (id) return navigateToView(id);

    navigateToList();
  };

  const canSave = title && text;

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

export default ItemForm;
