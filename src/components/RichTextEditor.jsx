

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

export default function RichTextEditor({ value = "", onChange }) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write Somethings here...",
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[180px] border rounded-b-xl p-4 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  // Sync value safely
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-xl overflow-hidden">
      
      {/* ⭐ Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-200">

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 cursor-pointer py-1 rounded ${
            editor.isActive("bold") ? "bg-blue-500 c text-white" : "bg-white"
          }`}
        >
          Bold
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 cursor-pointer py-1 rounded ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Italic
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 cursor-pointer py-1 rounded ${
            editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Underline
        </button>

        {/* Heading */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 cursor-pointer py-1 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          H2
        </button>

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 cursor-pointer py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          • List
        </button>

        {/* Numbered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 cursor-pointer py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          1. List
        </button>

        {/* Code */}
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("codeBlock")
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          {"</>"}
        </button> */}

        {/* Undo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 cursor-pointer py-1 rounded bg-white"
        >
          Undo
        </button>

        {/* Redo */}
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 cursor-pointer py-1 rounded bg-white"
        >
          Redo
        </button>
      </div>

      {/* ⭐ Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}