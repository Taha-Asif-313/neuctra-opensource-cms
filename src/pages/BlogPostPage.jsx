import React from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const BlogPostPage = () => {
  const { id } = useParams();
  const { blogs } = useAdmin();

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-3">Post not found</h1>
          <p className="text-white/50 mb-6">
            The article you're looking for doesn't exist or was removed.
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-white/60 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Blog
          </Link>

          <span className="text-xs text-white/40 truncate max-w-[300px]">
            {blog.title}
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT: ARTICLE */}
        <div className="lg:col-span-8">

          {/* Category */}
          <div className="flex gap-2 mb-6 text-xs">
            <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full">
              {blog.category}
            </span>

            {blog.featured && (
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-5 mt-5 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <User size={14} /> {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} /> {blog.readTime}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8" />

          {/* Image */}
          <div className="h-64 md:h-96 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10">
            <span className="text-6xl opacity-40">📝</span>
          </div>

          {/* Content */}
          <article className="prose prose-invert max-w-none">
            <div className="space-y-6 text-white/70 text-[16px] md:text-[17px] leading-relaxed">
              {blog.content.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </div>

        {/* RIGHT: SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">

          {/* Author / Meta Card */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl sticky top-24">
            <h3 className="text-sm font-medium text-white/70 mb-4">
              Article Info
            </h3>

            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User size={14} /> {blog.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} /> {blog.readTime}
              </div>
            </div>
          </div>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-sm font-medium text-white/70 mb-3">
                Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-white/10 border border-white/10 rounded-full text-white/60 flex items-center gap-1"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-sm font-medium text-white/70 mb-4">
              Related Posts
            </h3>

            <div className="space-y-4">
              {blogs
                .filter(
                  (b) =>
                    b.id !== blog.id &&
                    b.category === blog.category
                )
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.id}`}
                    className="block group"
                  >
                    <h4 className="text-sm font-medium text-white group-hover:text-blue-400 line-clamp-2">
                      {related.title}
                    </h4>

                    <p className="text-xs text-white/40 mt-1 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default BlogPostPage;