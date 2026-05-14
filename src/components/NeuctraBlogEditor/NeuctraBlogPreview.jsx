"use client";

import React from "react";
import CodeBlock from "./CodeBlock";
import RichTextPreview from "./RichTextPreview";
import HeadingPreview from "./HeadingPreview";
import ImagePreview from "./ImagePreview";
import TablePreview from "./TablePreview";

const NeuctraBlogPreview = ({ blocks = [], className = "" }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {blocks.map((block) => {
        // TEXT (NOW RICH HTML)
        if (block.type === "text") {
          return <RichTextPreview key={block.id} value={block.content} />;
        }

        // HEADING (RICH HTML SUPPORT)
        if (block.type === "heading") {
          return (
            <HeadingPreview
              key={block.id}
              value={block.content}
              level={block.level}
            />
          );
        }

        // IMAGE
        if (block.type === "image") {
          return <ImagePreview key={block.id} value={block} />;
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

        // TABLE (now using TablePreview)
        if (block.type === "table") {
          return (
            <div key={block.id} className="rounded-2xl border border-white/10">
              <TablePreview
                headers={block.headers}
                rows={block.rows}
                striped
                hoverable
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default NeuctraBlogPreview;
