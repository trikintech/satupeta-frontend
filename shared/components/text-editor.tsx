"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Underline as UnderlineIcon,
} from "lucide-react";
import Underline from "@tiptap/extension-underline";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  minHeight?: number;
  maxHeight?: number;
  initialHeight?: number;
}

export function TiptapEditor({
  content,
  onChange,
  minHeight = 200,
  maxHeight = 600,
  initialHeight = 800,
}: Readonly<TiptapEditorProps>) {
  const [editorHeight, setEditorHeight] = useState(initialHeight);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleResizeHeight = (height: number) => {
    const newHeight = Math.max(minHeight, Math.min(maxHeight, height));
    setEditorHeight(newHeight);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 bg-muted rounded-t-md border border-b-0">
        <Button
          size="icon"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("underline") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={
            editor.isActive("heading", { level: 1 }) ? "default" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={
            editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
          }
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant={
            editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
          }
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="border rounded-b-md overflow-hidden">
        <div
          className="prose max-w-none text-gray-700 p-4 overflow-y-auto"
          style={{ height: `${editorHeight}px` }}
        >
          <EditorContent
            editor={editor}
            className="h-full min-h-full"
            style={{ height: "100%", minHeight: "100%" }}
          />
        </div>

        <div className="flex items-center p-2 border-t bg-gray-50">
          <span className="text-sm text-gray-500 mr-2">Height:</span>
          <Input
            type="number"
            min={minHeight}
            max={maxHeight}
            value={editorHeight}
            onChange={(e) => handleResizeHeight(Number(e.target.value))}
            className="w-20 h-8"
          />
          <div className="flex ml-auto gap-2">
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="h-8"
            >
              Undo
            </Button>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="h-8"
            >
              Redo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
