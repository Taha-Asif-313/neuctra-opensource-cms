"use client";

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Sparkles,
  Folder,
  Tag,
  PenSquare,
  Eye,
} from "lucide-react";

import { Input, Textarea, Select, Button, Checkbox } from "@neuctra/ui";

import { getSingleBlog, updateBlog } from "../services/blog";
import { useAdmin } from "../contexts/AdminContext";
import { ReactSignedIn } from "@neuctra/authix";

const EditBlogPage = () => {
  const { id } = useParams();
  const { user } = useAdmin();
console.log(user);

  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [blog, setBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "React",
    tags: "",
    featured: false,
  });

  /* ---------------- Categories ---------------- */
  const categories = [
    { label: "React", value: "React" },
    {
      label: "JavaScript",
      value: "JavaScript",
    },
    { label: "CSS", value: "CSS" },
    {
      label: "Tutorial",
      value: "Tutorial",
    },
    {
      label: "Design",
      value: "Design",
    },
    {
      label: "Development",
      value: "Development",
    },
  ];

  /* ---------------- FETCH BLOG ---------------- */
useEffect(() => {
  const fetchBlog = async () => {
    try {
      setLoading(true);

      if (!user?.id || !id) return;

      const response =
        await getSingleBlog(
          user.id,
          id
        );

      if (
        response.success &&
        response.data
      ) {
        const blogData =
          response.data;

        setBlog(blogData);

        setFormData({
          title:
            blogData.title || "",

          excerpt:
            blogData.excerpt ||
            "",

          content:
            blogData.content ||
            "",

          category:
            blogData.category ||
            "React",

          tags: Array.isArray(
            blogData.tags
          )
            ? blogData.tags.join(
                ", "
              )
            : "",

          featured:
            blogData.featured ||
            false,
        });
      }
    } catch (error) {
      console.error(
        "Fetch Blog Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [id, user]);

  /* ---------------- UPDATE BLOG ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateBlog({
        dataId: id,

        title: formData.title,

        excerpt: formData.excerpt,

        content: formData.content,

        category: formData.category,

        featured: formData.featured,

        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      if (response.success) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Update Blog Error:", error);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-white/50">Loading blog...</p>
      </div>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-white/50">Blog not found</p>
      </div>
    );
  }

  return (
    <ReactSignedIn fallback={<Navigate to="/login" replace />}>
      <div className="min-h-screen overflow-hidden bg-black text-white">
        {/* ---------------- TOP BAR ---------------- */}
        <div className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 text-white/60 transition hover:text-white"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <div className="hidden h-6 w-px bg-white/10 md:block" />

              <div className="hidden md:block">
                <h1 className="text-sm font-medium text-white">Edit Blog</h1>

                <p className="max-w-[260px] truncate text-xs text-white/40">
                  {blog.title}
                </p>
              </div>
            </div>

            {/* Right */}
            <Button
              onClick={handleSubmit}
              leftIcon={Save}
              size="md"
              loading={saving}
            >
              {saving ? "Updating..." : "Update Blog"}
            </Button>
          </div>
        </div>

        {/* ---------------- MAIN LAYOUT ---------------- */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 bg-black px-6 py-10 lg:grid-cols-12">
          {/* LEFT SIDE */}
          <div className="space-y-8 lg:col-span-8">
            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <PenSquare size={15} />
                Blog Title
              </div>

              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter your article title..."
                size="lg"
                wrapperClassName="w-full"
                className="text-2xl font-bold md:text-4xl"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-3">
              <div className="text-sm text-white/50">Short Description</div>

              <Textarea
                rows={4}
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: e.target.value,
                  })
                }
                placeholder="Write a short summary..."
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Sparkles size={15} />
                Article Content
              </div>

              <Textarea
                rows={22}
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
                placeholder="Write your content..."
                className="font-mono text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Settings */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Folder size={16} className="text-primary" />

                  <h3 className="font-medium text-white">Edit Settings</h3>
                </div>

                <div className="space-y-5">
                  {/* Category */}
                  <Select
                    label="Category"
                    options={categories}
                    value={formData.category}
                    maxDropdownHeight={280}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        category: value,
                      })
                    }
                    placeholder="Select category"
                  />

                  {/* Tags */}
                  <div>
                    <label className="mb-2 block text-xs text-white/50">
                      Tags
                    </label>

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
                  </div>

                  {/* Featured */}
                  <Checkbox
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        featured: checked,
                      })
                    }
                    label="Featured post"
                  />
                </div>
              </div>

              {/* AI Assistant */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Sparkles size={16} />

                  <h3 className="font-medium">AI Assistant</h3>
                </div>

                <p className="text-sm leading-relaxed text-white/50">
                  Improve readability, optimize SEO, or rewrite content.
                </p>

                <Button variant="outline" className="mt-4 w-full">
                  Optimize Post
                </Button>
              </div>

              {/* Preview */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-white/70">
                  <Eye size={15} />

                  <h3 className="font-medium">Live Preview</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs text-primary">
                      {formData.category}
                    </span>

                    {formData.featured && (
                      <span className="rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/70">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="line-clamp-2 text-lg font-semibold text-white">
                    {formData.title || "Your blog title preview"}
                  </h2>

                  <p className="line-clamp-4 text-sm text-white/50">
                    {formData.excerpt ||
                      "Your excerpt preview will appear here..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactSignedIn>
  );
};

export default EditBlogPage;
