"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic import (disable SSR)
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((m) => m.CKEditor),
  { ssr: false }
);

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CkEditor({ value, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "imageUpload",
          "|",
          "undo",
          "redo",
        ],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
