"use client";

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Folder,
  Tag,
  PenSquare,
} from "lucide-react";

import { Input, Textarea, Select, Button, Checkbox } from "@neuctra/ui";

import { useAdmin } from "../contexts/AdminContext";
import { createBlog } from "../services/blog"; // update path

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const { user } = useAdmin();

  const [loading, setLoading] = useState(false);

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
    { label: "JavaScript", value: "JavaScript" },
    { label: "CSS", value: "CSS" },
    { label: "Tutorial", value: "Tutorial" },
    { label: "Design", value: "Design" },
    { label: "Development", value: "Development" },
  ];

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        featured: formData.featured,

        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        date: new Date().toISOString().split("T")[0],

        readTime: `${Math.ceil(
          formData.content.split(" ").length / 200,
        )} min read`,
      };

      const createdBlog = await createBlog(user.id, blogData);

      console.log("Created Blog:", createdBlog);

      navigate("/admin");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactSignedIn fallback={<Navigate to="/login" replace />}>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* ---------------- Main ---------------- */}
        <div className="z-10">
          {/* ---------------- Top Bar ---------------- */}
          <div className="sticky top-0 z-40 border-b border-white/10 bg-black/60">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
              {/* Left */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/blog/admin")}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                <div className="hidden md:block w-px h-6 bg-white/10" />

                <div className="hidden md:block">
                  <h1 className="text-sm font-medium text-white">
                    Create New Blog
                  </h1>

                  <p className="text-xs text-white/40">
                    Publish articles for Neuctra UI
                  </p>
                </div>
              </div>

              {/* Right */}
              <Button
                onClick={handleSubmit}
                leftIcon={Save}
                size="md"
                loading={loading}
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </Button>
            </div>
          </div>

          {/* ---------------- Layout ---------------- */}
          <div className="max-w-7xl bg-black mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ===================================================== */}
            {/* LEFT SIDE */}
            {/* ===================================================== */}
            <div className="lg:col-span-8 space-y-8">
              {/* ---------------- Title ---------------- */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/50 text-sm">
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
                  className="text-2xl md:text-4xl font-bold"
                />
              </div>

              {/* ---------------- Excerpt ---------------- */}
              <div className="space-y-3">
                <div className="text-white/50 text-sm">Short Description</div>

                <Textarea
                  rows={4}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excerpt: e.target.value,
                    })
                  }
                  placeholder="Write a short summary for your article..."
                />
              </div>

              {/* ---------------- Content ---------------- */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/50 text-sm">
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
                  placeholder="Start writing your story..."
                  className="font-mono text-sm leading-relaxed"
                />
              </div>
            </div>

            {/* ===================================================== */}
            {/* RIGHT SIDE */}
            {/* ===================================================== */}
            <div className="lg:col-span-4">
              <div className="top-28 space-y-6">
                {/* ---------------- Publish Settings ---------------- */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Folder size={16} className="text-primary" />

                    <h3 className="font-medium text-white">Publish Settings</h3>
                  </div>

                  <div className="space-y-5">
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
                      <label className="text-xs text-white/50 mb-2 block">
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
                      label="Mark as featured"
                    />
                  </div>
                </div>

                {/* ---------------- AI Assistant ---------------- */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl p-5">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Sparkles size={16} />

                    <h3 className="font-medium">AI Assistant</h3>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed">
                    Generate SEO titles, improve readability, rewrite content,
                    or generate summaries.
                  </p>

                  <Button variant="outline" className="w-full mt-4">
                    Improve Content
                  </Button>
                </div>

                {/* ---------------- Preview ---------------- */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                  <div className="flex items-center gap-2 mb-4 text-white/70">
                    <Eye size={15} />

                    <h3 className="font-medium">Live Preview</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs">
                        {formData.category}
                      </span>

                      {formData.featured && (
                        <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-white/70 text-xs">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-white line-clamp-2">
                      {formData.title || "Your blog title preview"}
                    </h2>

                    <p className="text-sm text-white/50 line-clamp-4">
                      {formData.excerpt ||
                        "Your excerpt preview will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactSignedIn>
  );
};

export default CreateBlogPage;
