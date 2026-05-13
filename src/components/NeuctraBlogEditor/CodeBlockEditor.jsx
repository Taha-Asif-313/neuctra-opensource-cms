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
    <div className="rounded-2xl overflow-hidden border-t border-white/10">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/80">
        {/* LEFT */}
        <div className="flex items-center flex-1 min-w-0">
          {/* TRAFFIC LIGHTS */}
          <div className="flex gap-1.5 px-4 py-3 border-r border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* LANGUAGE SELECT */}
          <div className="px-3 py-2 w-56">
            <Select
              value={language}
              onChange={onLanguageChange}
              options={languages.map((lang) => ({
                label: lang,
                value: lang,
              }))}
            />
          </div>
        </div>

        {/* COPY */}
        <div className="px-3">
          <button
            type="button"
            onClick={copyToClipboard}
            className="
        flex
        items-center
        gap-2
        px-3
        py-2
        rounded-xl
        border
        border-white/10
        bg-white/3
        hover:bg-white/6
        text-white/70
        hover:text-white
        transition-all
      "
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-sm">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="text-sm">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        maxRows={5}
        className="
          bg-transparent
          my-2
          text-white/90
          placeholder:text-white/30
          font-mono
        "
      />

      {/* LIVE PREVIEW */}
      {showPreview && value?.trim() && (
        <div className="border-t border-white/10">
          <div className="px-4 py-3 border-b border-white/10 bg-white/2">
            <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
              Preview
            </span>
          </div>

          <SyntaxHighlighter
            language={language}
            style={nightOwl}
            showLineNumbers
            wrapLines
            customStyle={{
              margin: 0,
              padding: "20px",
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
                fontFamily: '"Fira Code", "Monaco", "Cascadia Code", monospace',
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
