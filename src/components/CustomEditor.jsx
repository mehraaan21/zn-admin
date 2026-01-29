'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  Link,
  List
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

export default function CustomEditor({ value, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: 'GPL',
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Heading,
          Link,
          List
        ],
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'undo',
          'redo'
        ],
      }}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
