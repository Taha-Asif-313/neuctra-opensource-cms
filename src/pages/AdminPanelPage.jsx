import React, { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Plus,
  Edit2,
  Trash2,
  Search,
  LogOut,
  Sparkles,
  Clock3,
  Folder,
  Star,
  FileText,
  Eye,
  LayoutGrid,
  MoreVertical,
} from "lucide-react";

import { Badge, Button, Dropdown, Input, useToast } from "@neuctra/ui";

import { getAllBlogs, deleteBlog } from "../services/blog";

import { authix } from "../utils/neuctraAuthix";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const AdminPanelPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  /* ---------------- STATE ---------------- */
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* ---------------- FETCH BLOGS ---------------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await getAllBlogs();

        if (response?.success) {
          setBlogs(Array.isArray(response.data) ? response.data : []);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Fetch Blogs Error:", error);

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ---------------- DELETE BLOG ---------------- */
  const confirmDeleteBlog = async () => {
    if (!selectedBlog) return;

    try {
      setDeleteLoading(true);

      const response = await deleteBlog(
        selectedBlog.userId,
        selectedBlog.dataId || selectedBlog.id,
      );

      if (response) {
        setBlogs((prev) =>
          prev.filter(
            (b) =>
              (b.dataId || b.id) !== (selectedBlog.dataId || selectedBlog.id),
          ),
        );

        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      console.error("Delete Blog Error:", error);
      toast.error("Failed to delete blog");
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setSelectedBlog(null);
    }
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogoutClick = async () => {
    await authix.logoutUser();
    navigate("/");
  };

  /* ---------------- FILTER BLOGS ---------------- */
  const filteredBlogs = useMemo(() => {
    const safeBlogs = Array.isArray(blogs) ? blogs : [];

    return safeBlogs.filter((blog) => {
      const title = blog?.title || "";
      const excerpt = blog?.excerpt || "";
      const category = blog?.category || "";

      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [blogs, searchTerm]);

  /* ---------------- STATS ---------------- */
  const totalBlogs = blogs.length;
  const featuredBlogs = blogs.filter((blog) => blog.featured).length;
  const publicBlogs = blogs.filter(
    (blog) => blog.visibility === "public" || !blog.visibility,
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-white/50">Loading panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ---------------- BACKGROUND ---------------- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-100 top-0 h-100 w-100 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -right-80 h-100 w-100 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-50 py-4">
        <div className="mx-auto max-w-7xl rounded-2xl border border-zinc-800 bg-zinc-900 backdrop-blur-2xl">
          <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-3">
                <div className="rounded-xl bg-primary/15 p-2 text-primary">
                  <LayoutGrid size={18} />
                </div>

                <h1 className="truncate text-xl font-bold sm:text-2xl">
                  Blog Admin Panel
                </h1>
              </div>

              <p className="text-sm leading-relaxed text-white/40">
                Manage blogs, content, visibility and featured posts
              </p>
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                to="/blog/admin/create"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Plus size={18} />
                Create Blog
              </Link>

              <button
                onClick={handleLogoutClick}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600/10 px-5 py-3 text-sm text-red-500 transition hover:bg-red-600/20"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {/* Mobile Dropdown */}
            <div className="flex justify-end sm:hidden">
              <Dropdown
                align="right"
                width={220}
                menuClassName="rounded-2xl border border-zinc-800 bg-zinc-950 p-2"
                itemClassName="rounded-xl text-sm"
                trigger={
                  <button className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium transition hover:bg-zinc-800">
                    <LayoutGrid size={16} />
                    Actions
                  </button>
                }
                items={[
                  {
                    label: "Create Blog",
                    icon: <Plus size={16} />,
                    onClick: () => navigate("/blog/admin/create"),
                  },
                  { separator: true },
                  {
                    label: "Logout",
                    icon: <LogOut size={16} />,
                    danger: true,
                    onClick: handleLogoutClick,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- CONTENT ---------------- */}
      <main className="relative z-10 mx-auto max-w-7xl py-2">
        {/* ---------------- STATS ---------------- */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Total */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-primary/10 p-2.5 text-primary sm:p-3">
                <FileText size={20} className="sm:size-5.5" />
              </div>

              <span className="shrink-0 text-xs text-white/40">Total</span>
            </div>

            <h2 className="wrap-break-words text-2xl font-bold sm:text-3xl">
              {totalBlogs}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-white/40">
              Total blogs created
            </p>
          </div>

          {/* Featured */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-primary/10 p-2.5 text-primary sm:p-3">
                <Star size={20} className="sm:size-5.5" />
              </div>

              <span className="shrink-0 text-xs text-white/40">Featured</span>
            </div>

            <h2 className="wrap-break-words text-2xl font-bold sm:text-3xl">
              {featuredBlogs}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-white/40">
              Featured blog posts
            </p>
          </div>

          {/* Public */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 backdrop-blur-xl sm:p-5 lg:p-6 sm:col-span-2 xl:col-span-1">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-primary/10 p-2.5 text-primary sm:p-3">
                <Eye size={20} className="sm:size-5.5" />
              </div>

              <span className="shrink-0 text-xs text-white/40">Public</span>
            </div>

            <h2 className="wrap-break-words text-2xl font-bold sm:text-3xl">
              {publicBlogs}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-white/40">
              Public visible blogs
            </p>
          </div>
        </div>

        {/* ---------------- SEARCH ---------------- */}
        <div className="mb-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Manage Blogs</h2>

              <p className="text-sm text-white/40">
                Search and manage all your blog content
              </p>
            </div>

            <div className="w-full md:max-w-md">
              <Input
                type="text"
                prefixIcon={Search}
                placeholder="Search by title, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                wrapperClassName="w-full"
                inputClassName="bg-zinc-950!"
              />
            </div>
          </div>
        </div>

        {/* ---------------- LOADING ---------------- */}
        {loading ? (
          <div className="flex min-h-75 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />

              <p className="text-white/50">Loading blogs...</p>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 text-center">
            <div className="mb-5 rounded-3xl bg-primary/10 p-5 text-primary">
              <Sparkles size={40} />
            </div>

            <h3 className="text-xl font-semibold">No Blogs Found</h3>

            <p className="mt-2 max-w-md text-sm text-white/40">
              Try searching with a different keyword or create your first blog
              post.
            </p>

            <Link
              to="/blog/admin/create"
              className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-medium"
            >
              Create New Blog
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.dataId || blog.id}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-4 transition hover:bg-white/[0.07] sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  {/* ---------------- LEFT ---------------- */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      {/* Top badges */}
                      <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                        <Badge
                          text={blog.category || "General"}
                          icon={<Folder size={12} className="mr-1 inline" />}
                          size="md"
                        />

                        {blog.featured && (
                          <Badge
                            text="Featured"
                            icon={<Star size={12} className="mr-1 inline" />}
                            size="md"
                            variant="soft"
                            className="bg-yellow-500/10! text-yellow-500"
                          />
                        )}

                        <Badge
                          text={blog.visibility || "public"}
                          size="md"
                          variant="soft"
                          className="bg-zinc-800! capitalize text-zinc-100"
                        />
                      </div>

                      {/* Mobile dropdown */}
                      <div className="flex lg:hidden">
                        <Dropdown
                          align="right"
                          width={200}
                          menuClassName="rounded-2xl border border-zinc-800 bg-zinc-950 p-2"
                          itemClassName="rounded-xl text-sm"
                          trigger={<MoreVertical size={20} />}
                          items={[
                            {
                              label: "Edit",
                              icon: <Edit2 size={15} />,
                              onClick: () =>
                                navigate(
                                  `/blog/admin/edit/${blog.dataId || blog.id}`,
                                ),
                            },
                            { separator: true },
                            {
                              label: "Delete",
                              icon: <Trash2 size={15} />,
                              danger: true,
                              onClick: () => openDeleteModal(blog),
                            },
                          ]}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="mb-3 wrap-break-words text-xl font-bold transition group-hover:text-primary sm:text-2xl">
                      {blog.title}
                    </h2>

                    {/* content */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.blocks?.[0]?.content?.slice(0, 100) ||
                          "No content available",
                      }}
                      className="max-w-3xl text-sm leading-relaxed"
                    />

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/40 sm:mt-5 sm:gap-5 sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Clock3 size={14} />
                        <span>{blog.readTime || "1 min read"}</span>
                      </div>

                      <div>
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "No date"}
                      </div>

                      <div className="max-w-45 truncate sm:max-w-none">
                        User: {blog.userId}
                      </div>
                    </div>
                  </div>

                  {/* Desktop buttons */}
                  <div className="hidden items-center gap-3 lg:flex">
                    <Button
                      onClick={() =>
                        navigate(`/blog/admin/edit/${blog.dataId || blog.id}`)
                      }
                      className="rounded-2xl bg-primary p-4 text-zinc-100 transition hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit2 size={15} />
                    </Button>

                    <Button
                      onClick={() => openDeleteModal(blog)}
                      className="rounded-2xl bg-red-800 p-4 transition hover:bg-red-700"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          if (!deleteLoading) {
            setDeleteModalOpen(false);
            setSelectedBlog(null);
          }
        }}
        onConfirm={confirmDeleteBlog}
        loading={deleteLoading}
        title="Delete Blog"
        description={
          selectedBlog
            ? `Are you sure you want to delete "${selectedBlog.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this blog?"
        }
      />
    </div>
  );
};

export default AdminPanelPage;
