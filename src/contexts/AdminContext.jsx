import React, { createContext, useContext, useState, useEffect } from "react";
import { blogPosts } from "../utils/blogData";
import { authix } from "../utils/neuctraAuthix";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogs, setBlogs] = useState(blogPosts);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing admin session
 // Initialize user on app load
  useEffect(() => {
    const initUser = async () => {
      try {
        setLoading(true);

        // 1️⃣ Check session
        const sessionRes = await authix.checkUserSession();

        if (!sessionRes?.user?.id) {
          throw new Error("No active session");
        }

        const userId = sessionRes.user.id;

        // 2️⃣ Fetch full profile
        const profileRes = await authix.getUserProfile({ userId });

        if (!profileRes?.user) {
          throw new Error("User profile not found");
        }

        // 3️⃣ Save user
        setUser(profileRes.user);
      } catch (err) {
        console.warn("Auth init failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const handleLogin = (username, password) => {
    // Simple authentication (in production, use proper auth)
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("blogAdminSession", "true");
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    setIsAdmin(false);
    await authix.logoutUser();
  };

  const handleCreateBlog = (newBlog) => {
    const blog = {
      ...newBlog,
      id: Date.now(),
      author: "Admin",
      date: new Date().toLocaleDateString(),
      readTime:
        Math.ceil(newBlog.content.split(" ").length / 200) + " min read",
    };
    setBlogs([blog, ...blogs]);
  };

  const handleEditBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const value = {
    isAdmin,
    user,
    loading,
    blogs,
    handleLogin,
    handleLogout,
    handleCreateBlog,
    handleEditBlog,
    handleDeleteBlog,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;
