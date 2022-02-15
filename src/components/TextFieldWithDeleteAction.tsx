import DeleteIcon from '@mui/icons-material/Delete';
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import React from 'react';

interface Props {
  label: string;
  value: string;
  onDelete: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function TextFieldWithDeleteAction({
  label,
  value,
  onDelete,
  onChange,
}: Props) {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      sx={{ mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onDelete} edge="end">
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
}

export default TextFieldWithDeleteAction;
