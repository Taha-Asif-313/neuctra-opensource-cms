import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  ArrowUpRight,
  Sparkles,
  Star,
  Newspaper,
} from "lucide-react";
import { Badge } from "@neuctra/ui";

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// extract plain text from html
const stripHtml = (html = "") => {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// get first text block
const getExcerpt = (blocks = []) => {
  const textBlock = blocks.find((b) => b.type === "text");

  if (!textBlock?.content) return "Read this blog article.";

  return stripHtml(textBlock.content).slice(0, 120);
};

// get image from blocks if cover image missing
const getCoverImage = (blog) => {
  if (blog.coverImage) return blog.coverImage;

  const imageBlock = blog.blocks?.find((b) => b.type === "image");

  return imageBlock?.url || null;
};

const BlogCards = ({ blogs = [] }) => {
  return (
    <section className="w-full">
      <div className="space-y-10">
        {/* ================= BLOG GRID ================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.userId}/${blog.id}`}
              className="group block h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/40 transition-all duration-300">
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  {getCoverImage(blog) ? (
                    <>
                      <img
                        src={getCoverImage(blog)}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-black" />
                  )}

                  {/* category */}
                  <div className="absolute flex items-center gap-2 left-4 top-4">
                    {blog.featured && (
                      <Badge text="Featured" className="bg-yellow-600! " />
                    )}
                    <Badge text={blog.category || "Blog"} />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={13} />
                      {formatDate(blog.createdAt)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={13} />
                      {blog.readTime || "1 min read"}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition group-hover:text-primary">
                    {blog.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {getExcerpt(blog.blocks)}
                  </p>

                  {/* FOOTER */}
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="text-sm text-muted-foreground">
                        Read article
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background transition-all duration-300 group-hover:bg-primary">
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!blogs.length && (
          <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/30 text-center">
            <Newspaper className="w-14 h-14 text-muted-foreground" />

            <h3 className="mt-5 text-xl font-semibold text-foreground">
              No blogs found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Start publishing your first article.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogCards;
