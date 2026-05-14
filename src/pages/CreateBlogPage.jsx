"use client";

import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Folder,
  Tag,
} from "lucide-react";

import {
  Input,
  Select,
  Button,
  Checkbox,
} from "@neuctra/ui";

import { useAdmin } from "../contexts/AdminContext";
import { createBlog } from "../services/blog";

import { ReactSignedIn } from "@neuctra/authix";

import NeuctraBlogEditor from "../components/NeuctraBlogEditor/NeuctraBlogEditor";
import NeuctraBlogPreview from "../components/NeuctraBlogEditor/NeuctraBlogPreview";

import { createBlock } from "../utils/blogBlocks";

/* =========================================================
   PAGE
========================================================= */

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const { user } = useAdmin();

  const [loading, setLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "React",
    tags: "",
    featured: false,

    blocks: [
      createBlock("text"),
    ],
  });

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
      <div className="min-h-screen bg-black text-white">
        {/* =====================================================
           TOP BAR
        ===================================================== */}

        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* TOP ROW */}

            <div className="flex items-center justify-between gap-4">
              {/* LEFT */}

              <div className="flex items-center gap-4 min-w-fit">
                <button
                  onClick={() => navigate("/blog/admin")}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition"
                >
                  <ArrowLeft size={18} />

                  Back
                </button>

                <div className="hidden md:block w-px h-6 bg-white/10" />

                <div className="hidden xl:block">
                  <h1 className="text-sm font-medium text-white">
                    Visual Block Editor
                  </h1>

                  <p className="text-xs text-white/40">
                    Create modern technical articles
                  </p>
                </div>
              </div>

              {/* CENTER */}

              <div className="flex-1 max-w-3xl hidden md:flex">
                <div className="w-full relative">
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Untitled Article..."
                    wrapperClassName="w-full"
                    className="
                      h-12
                      bg-white/3
                      border-white/10
                      text-center
                      text-lg
                      font-semibold
                      rounded-2xl
                      placeholder:text-white/20
                      focus:border-primary
                      transition-all
                    "
                  />

                  {/* SLUG */}

                  {formData.title && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center">
                      <span className="text-[10px] text-white/30 tracking-wide">
                        /blog/
                        {formData.title
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "")
                          .replace(/\s+/g, "-")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-3 min-w-fit">
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />

                  <span className="text-xs text-white/50">
                    Draft
                  </span>
                </div>

                <Button
                  variant="outline"
                  leftIcon={Eye}
                  className="rounded-xl"
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

            <div className="mt-5 md:hidden">
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                placeholder="Untitled Article..."
                className="
                  h-12
                  bg-white/3
                  border-white/10
                  text-lg
                  font-semibold
                  rounded-2xl
                "
              />
            </div>
          </div>
        </div>

        {/* =====================================================
           MAIN LAYOUT
        ===================================================== */}

        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT */}

          <div className="lg:col-span-8 space-y-8">
            <NeuctraBlogEditor
              blocks={formData.blocks}
              setBlocks={setBlocks}
            />
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {/* SETTINGS */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Folder size={16} className="text-primary" />

                  <h3 className="font-medium">
                    Publish Settings
                  </h3>
                </div>

                <div className="space-y-5">
                  <Select
                    label="Category"
                    options={categories}
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        category: value,
                      })
                    }
                  />

                  <Input
                    prefixIcon={Tag}
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value,
                      })
                    }
                    placeholder="react, ui, saas"
                  />

                  <Checkbox
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        featured: checked,
                      })
                    }
                    label="Featured article"
                  />
                </div>
              </div>

              {/* AI */}

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Sparkles size={16} />

                  <h3 className="font-medium">
                    AI Assistant
                  </h3>
                </div>

                <p className="text-sm text-white/50">
                  Generate titles, summaries, formatting,
                  SEO optimization and readability improvements.
                </p>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                >
                  Improve Content
                </Button>
              </div>

              {/* STATS */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Eye size={15} />

                  <h3 className="font-medium">
                    Content Stats
                  </h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Blocks
                    </span>

                    <span>
                      {formData.blocks.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Words
                    </span>

                    <span>{wordCount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Reading Time
                    </span>

                    <span>
                      {Math.ceil(wordCount / 200)} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
         PREVIEW MODAL
      ===================================================== */}

      {showPreview && (
        <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-xl overflow-y-auto">
          {/* TOP */}

          <div className="sticky top-0 border-b border-white/10 bg-black/80 backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Blog Preview
                </h2>

                <p className="text-sm text-white/40">
                  Live article rendering
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
              >
                Close Preview
              </Button>
            </div>
          </div>

          {/* ARTICLE */}

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

            {/* EXCERPT */}

            {formData.excerpt && (
              <p className="text-xl text-white/60 leading-relaxed mb-10">
                {formData.excerpt}
              </p>
            )}

            {/* META */}

            <div className="flex items-center gap-5 text-sm text-white/40 border-b border-white/10 pb-8 mb-10">
              <span>{wordCount} words</span>

              <span>
                {Math.ceil(wordCount / 200)} min read
              </span>

              <span>
                {new Date().toLocaleDateString()}
              </span>
            </div>

            {/* BLOG PREVIEW */}

            <NeuctraBlogPreview
              blocks={formData.blocks}
            />

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
      )}
    </ReactSignedIn>
  );
};

export default CreateBlogPage;