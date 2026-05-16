"use client";

import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { ArrowLeft, Save, Eye, Sparkles, Folder, Tag } from "lucide-react";

import { Input, Select, Button, Checkbox, Switch } from "@neuctra/ui";

import { useAdmin } from "../contexts/AdminContext";
import { createBlog } from "../services/blog";

import { ReactSignedIn } from "@neuctra/authix";
import { NeuctraEditor, NeuctraEditorPreview } from "@neuctra/cms-core";

import { createBlock } from "../utils/blogBlocks";
import { defaultBlogState } from "../states/blog";
import BlogPreviewModal from "../components/BlogPreviewModal";

/* =========================================================
   PAGE
========================================================= */

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const { user } = useAdmin();

  const [loading, setLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState(() =>
    defaultBlogState({
      authorId: user?.id || "",
      author: {
        name: user?.name || "",
        username: user?.username || "",
        avatar: user?.avatar || "",
      },

      // override defaults that differ for this page
      tags: "",
      blocks: [createBlock("text")],
    }),
  );

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = [
    { label: "React", value: "React" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "CSS", value: "CSS" },
    { label: "Tutorial", value: "Tutorial" },
    { label: "Design", value: "Design" },
    { label: "Development", value: "Development" },
  ];

  /* =========================================================
     CONTENT JSON
  ========================================================= */

  const generatedContent = useMemo(() => {
    return JSON.stringify(formData.blocks, null, 2);
  }, [formData.blocks]);

  /* =========================================================
     WORD COUNT
  ========================================================= */

  const wordCount = useMemo(() => {
    return formData.blocks.reduce((acc, block) => {
      if (block.content) {
        return acc + block.content.split(" ").length;
      }

      if (block.items) {
        return acc + block.items.join(" ").split(" ").length;
      }

      return acc;
    }, 0);
  }, [formData.blocks]);

  /* =========================================================
     SET BLOCKS
  ========================================================= */

  const setBlocks = (value) => {
    if (typeof value === "function") {
      setFormData((prev) => ({
        ...prev,
        blocks: value(prev.blocks),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      blocks: value,
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        featured: formData.featured,
        visibility: formData.visibility,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        blocks: formData.blocks,
        content: generatedContent,
        readTime: `${Math.ceil(wordCount / 200)} min read`,
        createdAt: new Date().toISOString(),
      };

      await createBlog(user.id, blogData);

      navigate("/blog/admin");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactSignedIn fallback={<Navigate to="/login" replace />}>
      <div className="min-h-screen flex flex-col">
        {/* TOP BAR */}
        <div className="sticky top-0 z-50 border-b border-white/10">
          <div className="max-w-7xl mx-auto py-4 flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <Button
                iconBefore={<ArrowLeft size={18} />}
                variant="ghost"
                onClick={() => navigate("/blog/admin")}
                className="flex items-center gap-2 hover:text-zinc-200 transition"
              >
                Back
              </Button>

              <div className="hidden md:block w-px h-6 bg-white/10" />
            </div>

            {/* CENTER TITLE INPUT */}
            <div className="flex-1 max-w-2xl hidden md:block relative">
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Untitled Article..."
                className="w-full h-10 bg-transparent text-lg font-semibold border-b border-zinc-400 outline-none placeholder:text-zinc-400 focus:border-primary transition"
              />
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                leftIcon={Eye}
                className="rounded-xl bg-zinc-900"
                onClick={() => setShowPreview(true)}
              >
                Preview
              </Button>

              <Button
                leftIcon={Save}
                loading={loading}
                onClick={handleSubmit}
                className="rounded-xl"
              >
                Publish
              </Button>
            </div>
          </div>

          {/* MOBILE TITLE */}
          <div className="md:hidden pb-4">
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="Untitled Article..."
              className="h-11 bg-white/5 border-white/10 text-lg font-semibold rounded-xl"
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 max-w-7xl mx-auto w-full py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: EDITOR */}
          <div className="lg:col-span-8">
            <NeuctraEditor
              className="py-0! px-0!"
              blocks={formData.blocks}
              setBlocks={setBlocks}
            />
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* PUBLISH SETTINGS */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-2 mb-5">
                <Folder size={16} className="text-primary" />
                <h3 className="font-medium">Publish Settings</h3>
              </div>

              <div className="space-y-4">
                <Select
                  label="Category"
                  triggerClassName="bg-zinc-950/50!"
                  options={categories}
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((p) => ({ ...p, category: value }))
                  }
                />

                <Input
                  prefixIcon={Tag}
                  value={formData.tags}
                  inputClassName="bg-zinc-950/50!"
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, tags: e.target.value }))
                  }
                  label="Tags"
                  placeholder="react, ui, saas"
                />

                {/* FEATURED SWITCH */}
                <Switch
                  mode="single"
                  label="Featured article"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((p) => ({
                      ...p,
                      featured: Boolean(checked),
                    }))
                  }
                />

                {/* VISIBILITY SWITCH */}
                <Switch
                  mode="single"
                  label="Public visibility"
                  checked={formData.visibility === "public"}
                  onCheckedChange={(checked) =>
                    setFormData((p) => ({
                      ...p,
                      visibility: checked ? "public" : "private",
                    }))
                  }
                />
              </div>
            </div>

            {/* CONTENT STATS */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Eye size={15} />
                <h3 className="font-medium">Content Stats</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-200">Blocks</span>
                  <span>{formData.blocks.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-200">Words</span>
                  <span>{wordCount}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-200">Read Time</span>
                  <span>{Math.ceil(wordCount / 200)} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      <BlogPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        formData={formData}
        wordCount={wordCount}
      />
    </ReactSignedIn>
  );
};

export default CreateBlogPage;
