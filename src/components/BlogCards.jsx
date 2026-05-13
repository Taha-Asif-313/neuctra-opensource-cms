import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowUpRight } from "lucide-react";

const BlogCards = ({ blogs }) => {
  const featured = blogs?.[0];
  const rest = blogs?.slice(1);

  return (
    <div className="space-y-10">
      {/* Featured (minimal tech style) */}
      {featured && (
        <Link to={`/blog/${featured.userId}/${featured.id}`} className="block group">
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6 hover:border-white/20 transition">
            <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
              <span className="px-2 py-1 bg-white/10 rounded-full">
                Featured
              </span>
              <span>{featured.category}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold group-hover:text-primary transition">
              {featured.title}
            </h2>

            <p className="text-white/60 mt-3 line-clamp-2">
              {featured.excerpt}
            </p>

            <div className="flex items-center gap-5 mt-5 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <User size={14} /> {featured.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {featured.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {featured.readTime}
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest?.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.userId}/${blog.id}`}
            className="group border border-white/10 bg-white/5 rounded-xl p-5 hover:border-white/20 hover:-translate-y-1 transition"
          >
            <div className="text-xs text-white/40 mb-2">{blog.category}</div>

            <h3 className="text-lg font-medium group-hover:text-primary transition line-clamp-2">
              {blog.title}
            </h3>

            <p className="text-white/50 text-sm mt-2 line-clamp-2">
              {blog.excerpt}
            </p>

            <div className="flex items-center justify-between mt-4 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <User size={12} /> {blog.author}
              </span>
              <ArrowUpRight
                size={14}
                className="opacity-60 group-hover:opacity-100"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;
