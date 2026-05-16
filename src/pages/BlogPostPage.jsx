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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/60 animate-pulse text-sm">
          Loading article...
        </div>
      </div>
    );
  }

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
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/10 rounded-lg"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
  } = blog;

  const displayDate = publishedAt || createdAt;

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={index} className="text-2xl font-semibold text-white">
            {block.content}
          </h2>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-2 border-blue-500 pl-4 text-white/60 italic"
          >
            {block.content}
          </blockquote>
        );

      case "list":
        return (
          <ul key={index} className="list-disc pl-6 text-white/70">
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case "paragraph":
      default:
        return (
          <p key={index} className="text-white/70 leading-relaxed">
            {block.content}
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-white/60">
            <ArrowLeft size={18} />
            Blog
          </Link>

          <span className="text-xs text-white/40 truncate max-w-[300px]">
            {title}
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-8">
          {/* CATEGORY */}
          <div className="flex gap-2 mb-6 text-xs">
            {category && (
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full">
                {category}
              </span>
            )}

            {featured && (
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            {title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-5 mt-5 text-sm text-white/50">
            {author?.name && (
              <span className="flex items-center gap-2">
                <User size={14} />
                {author.name}
              </span>
            )}

            {displayDate && (
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {new Date(displayDate).toLocaleDateString()}
              </span>
            )}

            {readTime && (
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {readTime} min read
              </span>
            )}
          </div>

          <div className="border-t border-white/10 my-8" />

          {/* BLOCKS */}
          <article className="space-y-6">
            {blocks?.length > 0 ? (
              <NeuctraEditorPreview className="px-0!" blocks={blocks} />
            ) : (
              <p className="text-white/50">No content available</p>
            )}
          </article>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          {/* INFO */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl sticky top-24">
            <h3 className="text-sm text-white/70 mb-4">Article Info</h3>

            <div className="space-y-3 text-sm text-white/60">
              {author?.name && (
                <div className="flex items-center gap-2">
                  <User size={14} />
                  {author.name}
                </div>
              )}

              {displayDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(displayDate).toLocaleDateString()}
                </div>
              )}

              {readTime && (
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  {readTime} min read
                </div>
              )}
            </div>
          </div>

          {/* TAGS */}
          {tags?.length > 0 && (
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-sm text-white/70 mb-3">Tags</h3>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-white/10 border border-white/10 rounded-full flex items-center gap-1"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* RELATED */}
          {relatedBlogs?.length > 0 && (
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-sm text-white/70 mb-4">Related Posts</h3>

              <div className="space-y-4">
                {relatedBlogs.map((b) => (
                  <Link
                    key={b.id}
                    to={`/blog/${b.userId}/${b.id}`}
                    className="block"
                  >
                    <h4 className="text-sm text-white hover:text-blue-400">
                      {b.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BlogPostPage;
