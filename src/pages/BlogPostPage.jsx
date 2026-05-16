"use client";

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { NeuctraEditorPreview } from "@neuctra/cms-core";
import { getSingleBlog } from "../services/blog";

const BlogPostPage = () => {
  const { userId, blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  //  FETCH BLOG
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        const response = await getSingleBlog(userId, blogId);

        if (response.success) {
          setBlog(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [userId, blogId]);

  //  LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-white/50">Loading article...</p>
        </div>
      </div>
    );
  }

  //  NOT FOUND
  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-semibold mb-3">Post not found</h1>

          <p className="text-zinc-500 mb-6">
            The article you're looking for doesn't exist or was removed.
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  //  BLOG DATA
  const {
    title,
    coverImage,
    author,
    category,
    tags,
    blocks,
    featured,
    readTime,
    createdAt,
    publishedAt,
    excerpt,
  } = blog;

  const displayDate = publishedAt || createdAt;

  return (
    <div className="min-h-screen bg-black text-white">
{/* HERO */}
<section className="relative overflow-hidden border-b border-zinc-900">
  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 blur-3xl rounded-full opacity-40" />

    <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-white/5 blur-3xl rounded-full" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-12 md:pb-20">
    {/* BADGES */}
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {category && (
        <span className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl text-xs font-medium text-zinc-300">
          {category}
        </span>
      )}

      {featured && (
        <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-primary shadow-[0_0_30px_rgba(255,255,255,0.03)]">
           Featured Article
        </span>
      )}
    </div>

    {/* TITLE */}
    <div className="max-w-5xl">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] tracking-[-0.04em] text-white">
        {title}
      </h1>

      {/* OPTIONAL EXCERPT */}
      {excerpt && (
        <p className="mt-7 max-w-3xl text-base md:text-xl leading-relaxed text-zinc-400">
          {excerpt}
        </p>
      )}
    </div>

    {/* META CARD */}
    <div className="mt-10 flex flex-wrap items-center gap-4">
      {/* AUTHOR */}
      {author?.name && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
          {author?.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover border border-zinc-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <User size={16} />
            </div>
          )}

          <div>
            <p className="text-xs text-zinc-500">Written by</p>

            <p className="text-sm font-medium text-white">
              {author.name}
            </p>
          </div>
        </div>
      )}

      {/* DATE */}
      {displayDate && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Calendar size={16} className="text-zinc-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-500">Published</p>

            <p className="text-sm font-medium text-white">
              {new Date(displayDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* READ TIME */}
      {readTime && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Clock size={16} className="text-zinc-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-500">Read Time</p>

            <p className="text-sm font-medium text-white">
              {readTime}
            </p>
          </div>
        </div>
      )}
    </div>

    {/* COVER IMAGE */}
    {coverImage && (
      <div className="relative mt-14">
        {/* IMAGE GLOW */}
        <div className="absolute inset-0 bg-white/5 blur-3xl scale-95 rounded-[40px]" />

        <div className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950 shadow-2xl">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-[260px] sm:h-[380px] md:h-[620px] object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>
    )}
  </div>
</section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* CONTENT */}
        <main className="lg:col-span-8">
          <article className="min-w-0">
            {blocks?.length > 0 ? (
              <NeuctraEditorPreview blocks={blocks} className="px-0!" />
            ) : (
              <p className="text-zinc-500">No content available.</p>
            )}
          </article>
        </main>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* ARTICLE INFO */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <h3 className="text-sm font-medium text-zinc-300 mb-5">
                Article Info
              </h3>

              <div className="space-y-4 text-sm text-zinc-500">
                {author?.name && (
                  <div className="flex items-center gap-3">
                    <User size={15} />
                    <span>{author.name}</span>
                  </div>
                )}

                {displayDate && (
                  <div className="flex items-center gap-3">
                    <Calendar size={15} />
                    <span>{new Date(displayDate).toLocaleDateString()}</span>
                  </div>
                )}

                {readTime && (
                  <div className="flex items-center gap-3">
                    <Clock size={15} />
                    <span>{readTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* TAGS */}
            {tags?.length > 0 && (
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
                <h3 className="text-sm font-medium text-zinc-300 mb-4">Tags</h3>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs text-zinc-400 flex items-center gap-1.5"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* RELATED BLOGS */}
            {relatedBlogs?.length > 0 && (
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
                <h3 className="text-sm font-medium text-zinc-300 mb-5">
                  Related Posts
                </h3>

                <div className="space-y-5">
                  {relatedBlogs.map((item) => (
                    <Link
                      key={item.id}
                      to={`/blog/${item.userId}/${item.id}`}
                      className="block group"
                    >
                      <h4 className="text-sm text-zinc-300 group-hover:text-white transition leading-relaxed">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostPage;
