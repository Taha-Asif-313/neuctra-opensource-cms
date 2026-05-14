"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Type,
  Image,
  Code2,
  Table,
  Heading1,
  Eye,
  EyeOff,
  Copy,
  Check,
  AlertCircle,
  Save,
  Pencil,
} from "lucide-react";

import { Input, Textarea, Button } from "@neuctra/ui";

import { createBlock } from "../../utils/blogBlocks";
import RichTextEditor from "./RichTextEditor";
import HeadingEditor from "./HeadingEditor";
import CodeBlockEditor from "./CodeBlockEditor";
import TableEditor from "./TableEditor";
import ImageEditor from "./ImageEditor";
import { Editor } from "@monaco-editor/react";

const NeuctraBlogEditor = ({
  blocks = [],
  setBlocks,
  className = "",
  showToolbar = true,
}) => {
  /* =========================================================
     STATE
  ========================================================= */

  const [showBlocksPreview, setShowBlocksPreview] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [jsonValue, setJsonValue] = useState(JSON.stringify(blocks, null, 2));

  const [jsonError, setJsonError] = useState("");

  /* =========================================================
     REFS
  ========================================================= */

  const lastBlockRef = useRef(null);

  const previousBlocksLengthRef = useRef(blocks.length);

  /* =========================================================
     AUTO SCROLL
  ========================================================= */

  useEffect(() => {
    if (blocks.length > previousBlocksLengthRef.current) {
      lastBlockRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    previousBlocksLengthRef.current = blocks.length;
  }, [blocks]);

  useEffect(() => {
    if (!editMode) {
      setJsonValue(JSON.stringify(blocks, null, 2));
    }
  }, [blocks, editMode]);

  /* =========================================================
     ADD BLOCK
  ========================================================= */

  const addBlock = (type) => {
    setBlocks((prev) => [...prev, createBlock(type)]);
  };

  /* =========================================================
     UPDATE BLOCK
  ========================================================= */

  const updateBlock = (id, data) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...data } : block)),
    );
  };

  /* =========================================================
     DELETE BLOCK
  ========================================================= */

  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  /* =========================================================
     COPY BLOCKS JSON
  ========================================================= */

  const copyBlocks = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(blocks, null, 2));
    } catch (err) {
      console.error(err);
    }
  };

  const saveEditedBlocks = () => {
    try {
      const parsed = JSON.parse(jsonValue);

      if (!Array.isArray(parsed)) {
        setJsonError("Blocks must be an array");
        return;
      }

      setBlocks(parsed);

      setJsonError("");

      setEditMode(false);
    } catch (error) {
      setJsonError(error.message);
    }
  };

  return (
    <div className={className}>
      {/* TOOLBAR */}
      {showToolbar && (
        <div className="flex flex-wrap gap-3 mb-6">
          <ToolbarButton
            icon={Type}
            label="Text"
            onClick={() => addBlock("text")}
          />

          <ToolbarButton
            icon={Heading1}
            label="Heading"
            onClick={() => addBlock("heading")}
          />

          <ToolbarButton
            icon={Image}
            label="Image"
            onClick={() => addBlock("image")}
          />

          <ToolbarButton
            icon={Code2}
            label="Code"
            onClick={() => addBlock("code")}
          />

          <ToolbarButton
            icon={Table}
            label="Table"
            onClick={() => addBlock("table")}
          />

          {/* SHOW BLOCKS BUTTON */}

          <ToolbarButton
            icon={showBlocksPreview ? EyeOff : Eye}
            label={showBlocksPreview ? "Hide Blocks" : "Show Blocks"}
            onClick={() => setShowBlocksPreview((prev) => !prev)}
          />
        </div>
      )}

      {/* BLOCKS PREVIEW */}
      {showBlocksPreview && (
        <div
          className="
      mb-6
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-black/40
      backdrop-blur-xl
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
            <div>
              <h3 className="text-sm font-semibold text-white">
                Blocks Manager
              </h3>

              <p className="text-xs text-white/40">
                View, edit, import & update blog blocks
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* EDIT BUTTON */}

              <button
                onClick={() => setEditMode((prev) => !prev)}
                className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-xs
            text-white/70
            transition
            hover:bg-white/10
            hover:text-white
          "
              >
                <Pencil size={14} />

                {editMode ? "Cancel" : "Edit JSON"}
              </button>

              {/* COPY */}

              <button
                onClick={copyBlocks}
                className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-xs
            text-white/70
            transition
            hover:bg-white/10
            hover:text-white
          "
              >
                <Copy size={14} />
                Copy
              </button>

              {/* SAVE */}

              {editMode && (
                <button
                  onClick={saveEditedBlocks}
                  className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-500
              px-4
              py-2
              text-xs
              font-medium
              text-white
              transition
              hover:opacity-90
            "
                >
                  <Save size={14} />
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* ERROR */}

          {jsonError && (
            <div
              className="
          flex
          items-center
          gap-2
          border-b
          border-red-500/20
          bg-red-500/10
          px-4
          py-3
          text-sm
          text-red-300
        "
            >
              <AlertCircle size={15} />

              {jsonError}
            </div>
          )}

          {/* JSON CONTENT */}

          {editMode ? (
            <Editor
              height="500px"
              defaultLanguage="json"
              value={jsonValue}
              theme="vs-dark"
              onChange={(value) => {
                setJsonValue(value || "");

                if (jsonError) {
                  setJsonError("");
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          ) : (
            <pre
              className="
          max-h-150
          overflow-auto
          p-5
          font-mono
          text-sm
          leading-7
          text-green-400
        "
            >
              {JSON.stringify(blocks, null, 2)}
            </pre>
          )}

          {/* FOOTER */}

          <div
            className="
        flex
        items-center
        justify-between
        border-t
        border-white/10
        px-5
        py-3
        text-xs
        text-white/40
      "
          >
            <span>Total Blocks: {blocks.length}</span>

            <div className="flex items-center gap-2">
              <Check size={13} />
              Live Synced Editor
            </div>
          </div>
        </div>
      )}

      {/* BLOCKS */}
      {!showBlocksPreview && (
        <div className="space-y-6">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              ref={index === blocks.length - 1 ? lastBlockRef : null}
            >
              {/* CONTENT */}

              <div className="pt-2">
                {/* TEXT */}
                {block.type === "text" && (
                  <RichTextEditor
                    value={block.content}
                    onChange={(value) =>
                      updateBlock(block.id, {
                        content: value,
                      })
                    }
                    onDelete={() => deleteBlock(block.id)}
                    placeholder="Write paragraph..."
                  />
                )}

                {/* HEADING */}
                {block.type === "heading" && (
                  <HeadingEditor
                    value={block.content}
                    level={block.level || "h1"}
                    onChange={(content) =>
                      updateBlock(block.id, {
                        content,
                      })
                    }
                    onLevelChange={(level) =>
                      updateBlock(block.id, {
                        level,
                      })
                    }
                    onDelete={() => deleteBlock(block.id)}
                  />
                )}

                {/* IMAGE */}
                {block.type === "image" && (
                  <ImageEditor
                    value={block}
                    onChange={(data) => updateBlock(block.id, data)}
                    onDelete={() => deleteBlock(block.id)}
                  />
                )}

                {/* CODE */}
                {block.type === "code" && (
                  <CodeBlockEditor
                    value={block.content}
                    language={block.language || "javascript"}
                    onChange={(content) =>
                      updateBlock(block.id, {
                        content,
                      })
                    }
                    onLanguageChange={(language) =>
                      updateBlock(block.id, {
                        language,
                      })
                    }
                    onDelete={() => deleteBlock(block.id)}
                  />
                )}

                {/* TABLE */}
                {block.type === "table" && (
                  <TableEditor
                    headers={block.headers}
                    rows={block.rows}
                    onChange={({ headers, rows }) =>
                      updateBlock(block.id, {
                        headers,
                        rows,
                      })
                    }
                    onDelete={() => deleteBlock(block.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ToolbarButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        border
        border-white/10
        bg-white/3
        hover:bg-white/6
        transition
      "
    >
      <Icon size={15} />

      <span className="text-sm">{label}</span>
    </button>
  );
};

export default NeuctraBlogEditor;
