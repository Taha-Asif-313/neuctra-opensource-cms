"use client";

import React, { useEffect, useRef } from "react";

import {
  Type,
  List,
  Image,
  Code2,
  Table,
  Trash2,
  GripVertical,
  Plus,
  Quote,
  Heading1,
} from "lucide-react";

import { Input, Textarea, Button } from "@neuctra/ui";

import { createBlock } from "../../utils/blogBlocks";
import RichTextEditor from "./RichTextEditor";
import HeadingEditor from "./HeadingEditor";
import CodeBlockEditor from "./CodeBlockEditor";
import TableEditor from "./TableEditor";
import QuoteEditor from "./QuoteEditor";

const NeuctraBlogEditor = ({
  blocks = [],
  setBlocks,
  className = "",
  showToolbar = true,
}) => {
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
            icon={Quote}
            label="Quote"
            onClick={() => addBlock("quote")}
          />

          <ToolbarButton
            icon={List}
            label="List"
            onClick={() => addBlock("list")}
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
        </div>
      )}

      {/* BLOCKS */}

      <div className="space-y-6">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            ref={index === blocks.length - 1 ? lastBlockRef : null}
            className="
              rounded-2xl
              border-t
              border-white/10
              overflow-hidden
            "
          >
            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                px-4
                py-3
                border-b
                border-white/10
                bg-white/2
              "
            >
              <div className="flex items-center gap-3">
                <GripVertical size={15} className="text-white/30" />

                <span
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-white/40
                  "
                >
                  {block.type} block
                </span>
              </div>

              <button
                onClick={() => deleteBlock(block.id)}
                className="
                  text-white/40
                  hover:text-red-400
                "
              >
                <Trash2 size={15} />
              </button>
            </div>

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
                />
              )}

              {/* QUOTE */}
              {block.type === "quote" && (
                <QuoteEditor
                  value={block.content}
                  author={block.author || ""}
                  onChange={(content) =>
                    updateBlock(block.id, {
                      content,
                    })
                  }
                  onAuthorChange={(author) =>
                    updateBlock(block.id, {
                      author,
                    })
                  }
                />
              )}

              {/* IMAGE */}

              {block.type === "image" && (
                <div className="space-y-4">
                  <Input
                    value={block.url}
                    onChange={(e) =>
                      updateBlock(block.id, {
                        url: e.target.value,
                      })
                    }
                    placeholder="Image URL..."
                  />

                  <Input
                    value={block.caption}
                    onChange={(e) =>
                      updateBlock(block.id, {
                        caption: e.target.value,
                      })
                    }
                    placeholder="Image caption..."
                  />

                  {block.url && (
                    <img
                      src={block.url}
                      alt=""
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                      "
                    />
                  )}
                </div>
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
                />
              )}

              {/* LIST */}

              {block.type === "list" && (
                <div className="space-y-3">
                  {block.items.map((item, itemIndex) => (
                    <Input
                      key={itemIndex}
                      value={item}
                      onChange={(e) => {
                        const updated = [...block.items];

                        updated[itemIndex] = e.target.value;

                        updateBlock(block.id, {
                          items: updated,
                        });
                      }}
                      placeholder={`List item ${itemIndex + 1}`}
                    />
                  ))}

                  <Button
                    variant="outline"
                    leftIcon={Plus}
                    onClick={() => {
                      updateBlock(block.id, {
                        items: [...block.items, ""],
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
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
                />
              )}
            </div>
          </div>
        ))}
      </div>
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
