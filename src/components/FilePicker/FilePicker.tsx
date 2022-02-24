import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import ImagePreview from './ImagePreview';

export enum AcceptType {
  images = 'images',
}

const acceptTypes = {
  [AcceptType.images]: 'image/*',
};

function FilePicker({
  sectionTitle,
  multiple,
  accept,
  previewFiles,
  onUploadedFileDelete,
  onNewFileDelete,
  uploadedUrls,
  newFileUrls,
}: {
  sectionTitle: string;
  accept: AcceptType;
  previewFiles: React.ChangeEventHandler<HTMLInputElement>;
  onUploadedFileDelete: (url: string) => void;
  onNewFileDelete: (url: string, index: number) => void;
  uploadedUrls: string[];
  newFileUrls: string[];
  multiple?: boolean;
}) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle1">{sectionTitle}</Typography>

        <Button
          variant="outlined"
          component="label"
          sx={{ width: 'fit-content' }}
        >
          Завантажити
          <input
            multiple={multiple}
            accept={acceptTypes[accept]}
            type="file"
            hidden
            onChange={previewFiles}
          />
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {uploadedUrls.map(
          url =>
            accept === AcceptType.images && (
              <ImagePreview
                url={url}
                key={url}
                onDelete={() => onUploadedFileDelete(url)}
              />
            ),
        )}

        {newFileUrls.map(
          (url, index) =>
            accept === AcceptType.images && (
              <ImagePreview
                url={url}
                key={url}
                onDelete={() => onNewFileDelete(url, index)}
              />
            ),
        )}
      </Box>
    </>
  );
}

export default FilePicker;
