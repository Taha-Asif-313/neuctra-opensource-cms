import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowUpRight } from "lucide-react";

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BlogCards = ({ blogs = [] }) => {
  const featured = blogs?.find((b) => b.featured);
  const rest = blogs?.filter((b) => !b.featured);

  return (
    <div className="space-y-12">
      {/* ================= FEATURED ================= */}
      {featured && (
        <Link
          to={`/blog/${featured.userId}/${featured.id}`}
          className="block group"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition">
            
            {/* IMAGE */}
            {featured.coverImage && (
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-56 sm:h-72 md:h-96 object-cover opacity-80 group-hover:opacity-100 transition"
              />
            )}

            {/* CONTENT */}
            <div className="p-6 md:p-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                <span className="px-2 py-1 bg-white/10 rounded-full">
                  Featured
                </span>
                <span>{featured.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight group-hover:text-blue-400 transition">
                {featured.title}
              </h2>

              <p className="text-white/60 text-sm sm:text-base line-clamp-2">
                {featured.blocks?.[0]?.content || ""}
              </p>

              {/* META */}
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-white/50 pt-2">
                {featured.author?.name && (
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {featured.author.name}
                  </span>
                )}

                {featured.createdAt && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(featured.createdAt)}
                  </span>
                )}

                {featured.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {featured.readTime} min read
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest?.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.userId}/${blog.id}`}
            className="group block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-40 sm:h-44 overflow-hidden bg-white/5">
              {blog.coverImage ? (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl">
                  📝
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              {/* CATEGORY */}
              <div className="text-xs text-white/40">
                {blog.category}
              </div>

              {/* TITLE */}
              <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-blue-400 line-clamp-2">
                {blog.title}
              </h3>

              {/* EXCERPT FROM BLOCKS */}
              <p className="text-sm text-white/50 line-clamp-2">
                {blog.blocks?.find((b) => b.type === "paragraph")?.content ||
                  ""}
              </p>

              {/* META */}
              <div className="flex items-center justify-between text-xs text-white/40 pt-2">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {blog.author?.name}
                </span>

                <span className="flex items-center gap-1">
                  {formatDate(blog.createdAt)}
                </span>

                <ArrowUpRight
                  size={14}
                  className="opacity-60 group-hover:opacity-100"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;