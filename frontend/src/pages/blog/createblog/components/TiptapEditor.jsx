import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { GrUnorderedList } from "react-icons/gr";
import { FaBold } from "react-icons/fa6";
import { LuListOrdered } from "react-icons/lu";
import { FaLink } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaHeading } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import Heading from "@tiptap/extension-heading";
import { FaCode } from "react-icons/fa";

export default function Editor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Link,
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div>
      <div className="flex flex-wrap lg:gap-3 gap-2 bg-gray-50 border-b p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`hover:bg-gray-300 rounded-md p-2 ${
            editor.isActive("bold") ? "is-active" : ""
          }`}
        >
          <FaBold className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={"hover:bg-gray-300 rounded-md p-2"}
        >
          <FaItalic className="size-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleLink({ href: prompt("URL") })
              .run()
          }
          className={"hover:bg-gray-300 rounded-md p-2"}
        >
          <FaLink className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`hover:bg-gray-300 rounded-md p-2 ${
            editor.isActive("bulletList") ? "is-active" : ""
          }`}
        >
          <GrUnorderedList className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={"hover:bg-gray-300 rounded-md p-2"}
        >
          <LuListOrdered className="size-6" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`hover:bg-gray-300 rounded-md p-2 ${
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }`}
        >
          <FaHeading className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={"hover:bg-gray-300 rounded-md p-2"}
        >
          <ImQuotesLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={"hover:bg-gray-300 rounded-md p-2"}
        >
          <FaCode className="size-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .setImage({ src: prompt("Image URL") })
              .run()
          }
          className={"hover:bg-gray-300 rounded-md p-2"}
        >
          <FaRegImage className="size-5" />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border p-4 rounded bg-white h-64 overflow-y-auto"
      />
    </div>
  );
}
