"use client";

import React from "react";
import { Button } from "@neuctra/ui";
import { NeuctraEditorPreview } from "@neuctra/cms-core";

const BlogPreviewModal = ({ open, onClose, formData, wordCount }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-xl overflow-y-auto">
      {/* TOP BAR */}
      <div className="sticky top-0 border-b border-white/10 bg-black/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Blog Preview</h2>
            <p className="text-sm text-white/40">Live article rendering</p>
          </div>

          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* CATEGORY */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs">
            {formData.category}
          </span>

          {formData.featured && (
            <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs">
              Featured
            </span>
          )}
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {formData.title || "Untitled Article"}
        </h1>

        {/* META */}
        <div className="flex items-center gap-5 text-sm text-white/40 border-b border-white/10 pb-8 mb-10">
          <span>{wordCount} words</span>
          <span>{Math.ceil(wordCount / 200)} min read</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        {/* CONTENT PREVIEW */}
        <NeuctraEditorPreview blocks={formData.blocks} />

        {/* TAGS */}
        {formData.tags && (
          <div className="flex flex-wrap gap-3 mt-16 pt-10 border-t border-white/10">
            {formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/3 border border-white/10 text-sm text-white/60"
                >
                  #{tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPreviewModal;
