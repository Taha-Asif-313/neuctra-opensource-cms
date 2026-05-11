import React, { use, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  LogOut,
} from "lucide-react";

import { Input, useToast } from "@neuctra/ui";

import {
  getAllBlogs,
  deleteBlog,
} from "../services/blog";
import { authix } from "../utils/neuctraAuthix";

const AdminPage = () => {
  const navigate = useNavigate();
const {toast} = useToast();
  /* ---------------- STATE ---------------- */
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

/* ---------------- FETCH BLOGS ---------------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await getAllBlogs();

        if (response.success) {
          setBlogs(
            Array.isArray(response.data)
              ? response.data
              : []
          );
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error(
          "Fetch Blogs Error:",
          error
        );

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ---------------- DELETE BLOG ---------------- */
  const handleDeleteBlog = async (
    userId,
    dataId
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteBlog(
        userId,
        dataId
      );

      if (response) {
        /* Remove locally */
        setBlogs((prev) =>
          prev.filter(
            (blog) =>
              blog.id !== dataId
          )
        );
        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      console.error(
        "Delete Blog Error:",
        error
      );
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogoutClick = async () => {
    await authix.logoutUser();
    navigate("/");
  };

  /* ---------------- FILTER BLOGS ---------------- */
  const filteredBlogs = useMemo(() => {
    const safeBlogs = Array.isArray(blogs)
      ? blogs
      : [];

    return safeBlogs.filter((blog) => {
      const title = blog?.title || "";
      const excerpt =
        blog?.excerpt || "";

      return (
        title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        excerpt
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
      );
    });
  }, [blogs, searchTerm]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* ---------------- HEADER ---------------- */}
      <div className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          {/* Left */}
          <div>
            <h1 className="text-xl font-semibold">
              Admin Dashboard
            </h1>

            <p className="text-sm text-white/40">
              Manage your blog system
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 text-sm">
            
            {/* Create */}
            <Link
              to="/admin/create"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2"
            >
              <Plus size={16} />
              Add Blog
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        
        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            prefixIcon={Search}
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            wrapperClassName="w-full"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-white/50">
              Loading blogs...
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20">
            <p className="text-white/50">
              No blogs found
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBlogs.map((blog) => (
              <div
                key={
                  blog.dataId ||
                  blog.id
                }
                className="flex justify-between rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-primary/30"
              >
                
                {/* Blog Content */}
                <div className="space-y-2">
                  
                  {/* Title */}
                  <h3 className="text-lg font-medium">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="line-clamp-2 text-sm text-white/50">
                    {blog.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-white/40">
                    
                    <span className="text-primary">
                      {blog.category ||
                        "General"}
                    </span>

                    <span>
                      {blog.createdAt
                        ? new Date(
                            blog.createdAt
                          ).toLocaleDateString()
                        : "No date"}
                    </span>

                    <span>
                      {blog.readTime ||
                        "5 min read"}
                    </span>

                    {/* User */}
                    {blog.userId && (
                      <span>
                        User:{" "}
                        {blog.userId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  
                  {/* Edit */}
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/edit/${
                          blog.dataId ||
                          blog.id
                        }`
                      )
                    }
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-primary"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDeleteBlog(
                        blog.userId,
                        blog.dataId ||
                          blog.id
                      )
                    }
                    className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;