import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

const ReadOnlyBlog = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    editable: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};

export default ReadOnlyBlog;