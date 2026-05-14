import React, { useState } from "react";

import {
  Copy,
  Check,
  FileCode,
  FileJson,
  Braces,
  Boxes,
  Globe,
  Code2,
  FileCode2,
  Palette,
  TerminalSquare,
  Atom,
  Trash2,
} from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Select, Textarea } from "@neuctra/ui";

/* =========================================
   CODE BLOCK EDITOR
========================================= */

const CodeBlockEditor = ({
  value = "",
  language = "javascript",
  onChange,
  onLanguageChange,
  onDelete,
  placeholder = "Write code...",
  showPreview = true,
}) => {
  const [copied, setCopied] = useState(false);

  /* =========================================
     COPY
  ========================================= */

  const copyToClipboard = async () => {
    if (!value?.trim()) return;

    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================
     LANGUAGES
  ========================================= */

  const languages = [
    "javascript",
    "typescript",
    "react",
    "vue",
    "python",
    "html",
    "css",
    "json",
    "shell",
  ];

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: <Braces className="w-4 h-4 text-yellow-400" />,

      typescript: <Boxes className="w-4 h-4 text-sky-400" />,

      react: <Atom className="w-4 h-4 text-cyan-400" />,

      vue: <Globe className="w-4 h-4 text-green-400" />,

      python: <Code2 className="w-4 h-4 text-blue-400" />,

      html: <FileCode2 className="w-4 h-4 text-orange-400" />,

      css: <Palette className="w-4 h-4 text-pink-400" />,

      shell: <TerminalSquare className="w-4 h-4 text-zinc-300" />,

      json: <FileJson className="w-4 h-4 text-amber-300" />,
    };

    return icons[lang] || <FileCode className="w-4 h-4 text-zinc-400" />;
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-linear-to-b
        from-white/3
        to-transparent
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-5
          py-4
        "
      >
        {/* LEFT */}

        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
            "
          >
            {getLanguageIcon(language)}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Code Editor</h3>

            <p className="text-xs text-white/40">
              Syntax highlighted code editor & live preview
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">
          {/* LANGUAGE */}

          <div className="w-40">
            <Select
              value={language}
              onChange={onLanguageChange}
              options={languages.map((lang) => ({
                label: lang,
                value: lang,
              }))}
            />
          </div>

          {/* COPY */}

          <button
            type="button"
            onClick={copyToClipboard}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2.5
              text-sm
              text-white/70
              transition-all
              duration-200
              hover:bg-white/10
              hover:text-white
            "
          >
            {copied ? (
              <>
                <Check size={15} className="text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy
              </>
            )}
          </button>

          {/* DELETE */}

          <button
            onClick={onDelete}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              text-red-300
              transition-all
              duration-200
              hover:scale-105
              hover:bg-red-500/20
              hover:text-red-200
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* EDITOR */}

      <div className="p-5">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          maxRows={8}
          className="
            bg-black/20
            font-mono
            text-white/90
            placeholder:text-white/30
          "
        />
      </div>

      {/* LIVE PREVIEW */}

      {showPreview && value?.trim() && (
        <div className="border-t border-white/10">
          <div
            className="
              flex
              items-center
              gap-2
              border-b
              border-white/10
              bg-white/2
              px-5
              py-3
            "
          >
            <FileCode size={14} className="text-white/40" />

            <span
              className="
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-white/50
              "
            >
              Live Preview
            </span>
          </div>

          <SyntaxHighlighter
            language={language}
            style={nightOwl}
            showLineNumbers
            wrapLines
            customStyle={{
              margin: 0,
              padding: "24px",
              background: "transparent",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
            lineNumberStyle={{
              minWidth: "3em",
              color: "#6B7280",
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontFamily: '"Fira Code", "Monaco", monospace',
              },
            }}
          >
            {value}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CodeBlockEditor;
