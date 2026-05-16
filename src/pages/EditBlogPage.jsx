"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Folder,
  Tag,
  ImagePlus,
} from "lucide-react";

import { Input, Select, Button, Checkbox, Switch } from "@neuctra/ui";

import { useAdmin } from "../contexts/AdminContext";
import { getSingleBlog, updateBlog } from "../services/blog";

import { ReactSignedIn } from "@neuctra/authix";
import { NeuctraEditor, NeuctraEditorPreview } from "@neuctra/cms-core";

import { createBlock } from "../utils/blogBlocks";
import { defaultBlogState } from "../states/blog";
import BlogPreviewModal from "../components/BlogPreviewModal";
import CoverImageModal from "../components/modals/CoverImageModal";

/* =========================================================
   PAGE
========================================================= */

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [blog, setBlog] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  const [formData, setFormData] = useState(null);

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
     FETCH BLOG
  ========================================================= */

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        if (!user?.id || !id) return;

        const response = await getSingleBlog(user.id, id);

        if (response.success && response.data) {
          const blogData = response.data;

          setBlog(blogData);

          // Map the existing blog data to our form state
          setFormData(
            defaultBlogState({
              id: blogData.id || "",
              slug: blogData.slug || "",
              title: blogData.title || "",
              coverImage: blogData.coverImage || "",
              authorId: blogData.authorId || user?.id || "",
              author: {
                name: blogData.author?.name || user?.name || "",
                username: blogData.author?.username || user?.username || "",
                avatar: blogData.author?.avatar || user?.avatar || "",
              },
              category: blogData.category || "React",
              tags: Array.isArray(blogData.tags)
                ? blogData.tags.join(", ")
                : blogData.tags || "",
              blocks: blogData.blocks?.length
                ? blogData.blocks
                : [createBlock("text")],
              featured: blogData.featured || false,
              visibility: blogData.visibility || "public",
              readTime: blogData.readTime || 0,
              views: blogData.views || 0,
              likes: blogData.likes || [],
              bookmarks: blogData.bookmarks || [],
              commentsCount: blogData.commentsCount || 0,
              createdAt: blogData.createdAt || "",
              updatedAt: blogData.updatedAt || "",
              publishedAt: blogData.publishedAt || "",
            }),
          );
        }
      } catch (error) {
        console.error("Fetch Blog Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user]);

  //  CONTENT JSON
  const generatedContent = useMemo(() => {
    if (!formData?.blocks) return "";
    return JSON.stringify(formData.blocks, null, 2);
  }, [formData?.blocks]);

  //  WORD COUNT
  const wordCount = useMemo(() => {
    if (!formData?.blocks) return 0;

    return formData.blocks.reduce((acc, block) => {
      if (block.content) {
        return acc + block.content.split(" ").length;
      }

      if (block.items) {
        return acc + block.items.join(" ").split(" ").length;
      }

      return acc;
    }, 0);
  }, [formData?.blocks]);

  //  SET BLOCKS
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

  //  SUBMIT
  const handleSubmit = async () => {
    try {
      setSaving(true);

      const blogData = {
        title: formData.title,
        coverImage: formData.coverImage,
        visibility: formData.visibility,
        category: formData.category,
        featured: formData.featured,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        blocks: formData.blocks,
        content: generatedContent,
        readTime: `${Math.ceil(wordCount / 200)} min read`,
        updatedAt: new Date().toISOString(),
      };

      const response = await updateBlog({
        userId: user.id,
        dataId: id,
        updatedBlog: blogData,
      });

      if (response.success) {
        navigate("/blog/admin");
      }
    } catch (error) {
      console.error("Update Blog Error:", error);
    } finally {
      setSaving(false);
    }
  };

  //  LOADING STATE
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-white/50">Loading blogs...</p>
        </div>
      </div>
    );
  }

  //  NOT FOUND STATE
  if (!blog || !formData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-white/50">Blog not found</p>
      </div>
    );
  }

  return (
    <ReactSignedIn fallback={<Navigate to="/login" replace />}>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* TOP BAR */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto py-4 flex items-center justify-between gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                iconBefore={<ArrowLeft size={18} />}
                onClick={() => navigate("/blog/admin")}
                className="flex items-center gap-2  hover:text-white transition"
              >
                Back
              </Button>
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
                leftIcon={ImagePlus}
                className="rounded-xl bg-zinc-900"
                onClick={() => setShowCoverModal(true)}
              >
                Cover
              </Button>
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
                loading={saving}
                onClick={handleSubmit}
                className="rounded-xl"
              >
                {saving ? "Updating..." : "Update"}
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
          <div className="lg:col-span-4 space-y-2">
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
                  <span className="text-white/50">Blocks</span>
                  <span>{formData.blocks.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Words</span>
                  <span>{wordCount}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Read Time</span>
                  <span>{Math.ceil(wordCount / 200)} min</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/50">Views</span>
                  <span>{formData.views}</span>
                </div>
              </div>
            </div>

            {/* BLOG INFO */}
            {formData.createdAt && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-medium mb-3">Blog Info</h3>

                <div className="space-y-2 text-xs text-white/50">
                  <div className="flex justify-between">
                    <span>Created</span>
                    <span>
                      {new Date(formData.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {formData.updatedAt && (
                    <div className="flex justify-between">
                      <span>Updated</span>
                      <span>
                        {new Date(formData.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {formData.publishedAt && (
                    <div className="flex justify-between">
                      <span>Published</span>
                      <span>
                        {new Date(formData.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
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

      {/* COVER IMAGE MODAL */}
      <CoverImageModal
        isOpen={showCoverModal}
        onClose={() => setShowCoverModal(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </ReactSignedIn>
  );
};

export default EditBlogPage;
