import {
  List,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
} from "lucide-react";

import { useRef, useEffect } from "react";

/* =========================================
   RICH TEXT EDITOR (FIXED)
========================================= */

const RichTextEditor = ({ value = "", onChange, placeholder = "Write..." }) => {
  const editorRef = useRef(null);
  const isTypingRef = useRef(false);

  /* =========================================
     INIT CONTENT ONLY ONCE / EXTERNAL UPDATE
  ========================================= */

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    // prevent overwrite while typing
    if (isTypingRef.current) return;

    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  /* =========================================
     EXEC COMMAND
  ========================================= */

  const exec = (command) => {
    document.execCommand(command, false, null);

    const html = editorRef.current.innerHTML;
    onChange(html);
  };

  /* =========================================
     INPUT HANDLER
  ========================================= */

  const handleInput = () => {
    isTypingRef.current = true;

    const html = editorRef.current.innerHTML;
    onChange(html);

    // release typing lock
    setTimeout(() => {
      isTypingRef.current = false;
    }, 50);
  };

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-white/10 bg-white/2">
        <Btn icon={Bold} onClick={() => exec("bold")} />
        <Btn icon={Italic} onClick={() => exec("italic")} />
        <Btn icon={Underline} onClick={() => exec("underline")} />

        <div className="w-px h-6 bg-white/10 mx-1" />

        <Btn icon={AlignLeft} onClick={() => exec("justifyLeft")} />
        <Btn icon={AlignCenter} onClick={() => exec("justifyCenter")} />
        <Btn icon={AlignRight} onClick={() => exec("justifyRight")} />

        <div className="w-px h-6 bg-white/10 mx-1" />

        <Btn icon={List} onClick={() => exec("insertUnorderedList")} />
        <Btn icon={ListOrdered} onClick={() => exec("insertOrderedList")} />
      </div>

      {/* EDITOR */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="
  min-h-55
  p-5
  outline-none
  text-white/80
  leading-8

  [&_ul]:list-disc
  [&_ol]:list-decimal
  [&_ul]:pl-6
  [&_ol]:pl-6
  [&_li]:ml-2

  [&:empty:before]:content-[attr(data-placeholder)]
  [&:empty:before]:text-white/30
  [&:empty:before]:pointer-events-none
"
        data-placeholder={placeholder}
      />
    </div>
  );
};

/* =========================================
   BUTTON
========================================= */

const Btn = ({ icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        p-2
        rounded-lg
        border
        border-white/10
        bg-white/3
        hover:bg-white/6
        transition
      "
    >
      <Icon size={15} />
    </button>
  );
};

export default RichTextEditor;
