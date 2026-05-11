import React, { useEffect, useMemo, useState } from "react";

import BlogCards from "../components/BlogCards";
import BlogsHeader from "../components/BlogsHeader";

import { getAllBlogs } from "../services/blog";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  console.log(blogs);
  

  /* ---------------- FETCH BLOGS ---------------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await getAllBlogs();

        if (response.success) {
          setBlogs(response.data || []);
        }
      } catch (error) {
        console.error("Fetch Blogs Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ---------------- FILTER + SORT ---------------- */
  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    /* Search */
    filtered = filtered.filter((blog) => {
      const title = blog?.title || "";
      const excerpt = blog?.excerpt || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    /* Sort */
    if (sortBy === "latest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (sortBy === "popular") {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return filtered;
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <BlogsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl py-6">
        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400">Loading blogs...</p>
          </div>
        ) : (
          <>
            {/* Results */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {filteredBlogs.length} article
                {filteredBlogs.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Blogs Grid */}
            <BlogCards blogs={filteredBlogs} />
          </>
        )}
      </div>
    </div>
  );
};

export default AllBlogsPage;