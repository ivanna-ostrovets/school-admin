import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import './TinyMCEOverrides.css';

const plugins = [
  'autoresize',
  'paste',
  'code',
  'link',
  'table',
  'lists',
  'help',
  'quickbars',
];

const toolbar = [
  'undo',
  'redo',
  '|',
  'bold',
  'italic',
  '|',
  'removeformat',
  '|',
  'formatselect',
  '|',
  'numlist',
  'bullist',
  '|',
  'link',
  'table',
  'code',
];

// TODO: rewrite global styles
function TextEditor({
  data,
  onChange,
}: {
  data: string;
  onChange: (data: string) => void;
}) {
  return (
    <Editor
      apiKey={process.env.REACT_APP_TEXT_EDITOR_API_KEY}
      initialValue={data}
      init={{
        plugins: plugins.join(' '),
        menubar: 'edit format',
        toolbar: toolbar.join(' '),
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quicktable',
        toolbar_mode: 'wrap',
        contextmenu: 'copy paste link table',
        language: 'uk',
        keep_styles: false,
        extended_valid_elements: 'table,tr,td',
      }}
      onEditorChange={onChange}
    />
  );
}

export default TextEditor;
