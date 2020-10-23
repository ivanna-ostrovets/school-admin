import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/uk';
import CKEditor from '@ckeditor/ckeditor5-react';
import React from 'react';

function TextEditor({
  data,
  onChange,
}: {
  data: string;
  onChange: (data: string) => void;
}) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{ language: 'uk' }}
      data={data}
      onChange={async (event: any, editor: any) => onChange(editor.getData())}
    />
  );
}

export default TextEditor;
