import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/uk';
import CKEditor from '@ckeditor/ckeditor5-react';
import React from 'react';
import './CKEditorOverrides.css';

function TextEditor({
  data,
  onChange,
}: {
  data: string;
  onChange: (data: string) => void;
}) {
  return (
    <CKEditor
      onInit={(editor: any) => {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement(),
          );
      }}
      editor={DocumentEditor}
      config={{ language: 'uk' }}
      data={data}
      onChange={async (event: any, editor: any) => onChange(editor.getData())}
    />
  );
}

export default TextEditor;
