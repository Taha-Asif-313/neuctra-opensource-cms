"use client";

import React from "react";
import CodeBlock from "./CodeBlock";

const NeuctraBlogPreview = ({
  blocks = [],
  className = "",
}) => {
  const renderHTML = (html) => {
    return (
      <div
        className="text-white/75 leading-8 text-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {blocks.map((block) => {
        // TEXT (NOW RICH HTML)
        if (block.type === "text") {
          return (
            <div
              key={block.id}
              className="
                prose prose-invert max-w-none
                text-white/75
              "
              dangerouslySetInnerHTML={{
                __html: block.content,
              }}
            />
          );
        }

        // HEADING (RICH HTML SUPPORT)
        if (block.type === "heading") {
          return (
            <h2
              key={block.id}
              className="text-3xl md:text-4xl font-bold leading-tight"
              dangerouslySetInnerHTML={{
                __html: block.content,
              }}
            />
          );
        }

        // QUOTE (RICH HTML)
        if (block.type === "quote") {
          return (
            <blockquote
              key={block.id}
              className="border-l-4 border-primary pl-6 text-2xl text-white/70"
              dangerouslySetInnerHTML={{
                __html: block.content,
              }}
            />
          );
        }

        // LIST (KEEP ARRAY OR HTML SAFE FALLBACK)
        if (block.type === "list") {
          return (
            <ul
              key={block.id}
              className="space-y-3 list-disc pl-6 text-white/75"
            >
              {block.items.map((item, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                  className="text-lg"
                />
              ))}
            </ul>
          );
        }

        // IMAGE
        if (block.type === "image") {
          return (
            <div key={block.id} className="space-y-4">
              {block.url && (
                <img
                  src={block.url}
                  alt={block.caption}
                  className="w-full rounded-3xl border border-white/10"
                />
              )}

              {block.caption && (
                <p className="text-center text-sm text-white/40">
                  {block.caption}
                </p>
              )}
            </div>
          );
        }

        // CODE
        if (block.type === "code") {
          return (
            <CodeBlock
              key={block.id}
              language={block.language}
              code={block.content}
            />
          );
        }

        // TABLE (unchanged)
        if (block.type === "table") {
          return (
            <div
              key={block.id}
              className="overflow-auto rounded-2xl border border-white/10"
            >
              <table className="w-full border-collapse">
                <thead className="bg-white/3">
                  <tr>
                    {block.headers.map((header, i) => (
                      <th
                        key={i}
                        className="border border-white/10 px-5 py-3 text-left"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-white/10 px-5 py-3 text-white/70"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default NeuctraBlogPreview;