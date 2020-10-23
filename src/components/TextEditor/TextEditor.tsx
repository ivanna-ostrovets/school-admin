import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import './TinyMCEOverrides.css';

const plugins = [
  'autoresize',
  'paste',
  'searchreplace',
  'code',
  'image',
  'link',
  'table',
  'charmap',
  'nonbreaking',
  'advlist',
  'lists',
  'wordcount',
  'imagetools',
  'help',
  'quickbars',
  'emoticons',
];

const toolbar = [
  'undo',
  'redo',
  '|',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  '|',
  'formatselect',
  '|',
  'alignleft',
  'aligncenter',
  'alignright',
  'alignjustify',
  '|',
  'outdent',
  'indent',
  '|',
  'numlist',
  'bullist',
  '|',
  'forecolor',
  'backcolor',
  'removeformat',
  '|',
  'charmap',
  'emoticons',
  'image',
  'link',
  'table',
  '|',
  'code',
  'help',
];

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
        menubar: 'edit insert format tools',
        toolbar: toolbar.join(' '),
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quicktable',
        toolbar_mode: 'wrap',
        contextmenu: 'copy paste link image imagetools table',
        language: 'uk',
      }}
      onEditorChange={content => onChange(content)}
    />
  );
}

export default TextEditor;
