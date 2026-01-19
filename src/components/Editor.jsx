"use client"; // 1. Must have this for Next.js App Router

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react'; // Added useEffect

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "bg-white text-gray-700 hover:bg-gray-100 border";
  
  const Button = ({ onClick, isActive, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${isActive ? activeClass : inactiveClass}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 rounded-t-lg">
      <Button onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>B</Button>
      <Button onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>I</Button>
      <Button onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>S</Button>
      <Button onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>List</Button>
      <Button onClick={() => editor.chain().focus().undo().run()}>Undo</Button>
      <Button onClick={() => editor.chain().focus().redo().run()}>Redo</Button>
    </div>
  );
};

const CustomEditor = ({ value, onChange, placeholder = "Write something..." }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, // 2. Important for Next.js SSR
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // 3. Prevent unnecessary re-renders
      if (html !== value) {
        onChange(html);
      }
    },
  });

  // 4. Force Update: Sync editor if 'value' changes externally (e.g., API load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full border rounded-lg focus-within:ring-1 text-start  transition-all bg-white overflow-hidden">
      <Toolbar editor={editor} />
      {/* 5. Prose class is vital for Tailwind CSS to show bold/lists */}
      <div className="p-4 prose prose-sm max-w-none min-h-[150px] focus:outline-none">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
      
      <style jsx global>{`
        .ProseMirror { min-height: 150px; outline: none; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default CustomEditor;