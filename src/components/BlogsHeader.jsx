"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Sparkles,
  Code2,
  Palette,
  Laptop,
  BookOpen,
  House,
  Home,
} from "lucide-react";

import { Input, Select } from "@neuctra/ui";
import { Link } from "react-router-dom";

const BlogsHeader = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  /* ---------------- NAV LINKS (EDIT HERE) ---------------- */
  const navLinks = useMemo(
    () => [
      {
        label: "Home",
        to: "/",
        icon: Home,
      },
      {
        label: "Blogs",
        to: "/blogs",
        icon: BookOpen,
      },
      {
        label: "Docs",
        to: "/docs",
        icon: Code2,
      },
    ],
    [],
  );

  /* ---------------- Categories ---------------- */
  const categories = useMemo(
    () => [
      {
        label: "All Posts",
        value: "all",
        icon: <Sparkles size={15} />,
        description: "Browse all blog articles",
      },
      {
        label: "React",
        value: "React",
        icon: <Code2 size={15} />,
        description: "React tutorials & guides",
      },
      {
        label: "JavaScript",
        value: "JavaScript",
        icon: <Laptop size={15} />,
        description: "Modern JavaScript content",
      },
      {
        label: "CSS",
        value: "CSS",
        icon: <Palette size={15} />,
        description: "Styling & animations",
      },
      {
        label: "Tutorial",
        value: "Tutorial",
        icon: <Code2 size={15} />,
        description: "Step by step tutorials",
      },
      {
        label: "Design",
        value: "Design",
        icon: <Palette size={15} />,
        description: "UI/UX design resources",
      },
      {
        label: "Development",
        value: "Development",
        icon: <Laptop size={15} />,
        description: "Web development articles",
      },
    ],
    [],
  );

  /* ---------------- Sort Options ---------------- */
  const sortOptions = [
    {
      label: "Latest Posts",
      value: "latest",
    },
    {
      label: "Popular Posts",
      value: "popular",
    },
    {
      label: "Oldest Posts",
      value: "oldest",
    },
  ];

  return (
    <header className="sticky top-0 z-40">
      {/* ---------------- Top Header ---------------- */}
      <div className="flex items-center justify-between gap-3 py-6">
        {/* ---------------- Left - Logo ---------------- */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Logo */}
          <img className="h-7 w-7" src="/logo.png" alt="Neuctra Logo" />

          {/* Text */}
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-base font-black tracking-tight text-white">
              Neuctra
              <span className="h-4 w-px bg-zinc-600" />
              <span className="text-primary">Blog</span>
            </p>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => {
            const Icon = item?.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ---------------- Filters ---------------- */}
      <div className="py-2">
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              type="text"
              prefixIcon={Search}
              placeholder="Search articles, guides, tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              wrapperClassName="w-full"
            />
          </div>

          {/* Category */}
          <div className="w-60">
            <Select
              prefixIcon={Filter}
              options={categories}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              placeholder="Category"
              searchable
              searchPlaceholder="Search category..."
              showDescription
              size="md"
              maxDropdownHeight={280}
              className="w-full"
            />
          </div>

          {/* Sort */}
          <div className="w-45">
            <Select
              options={sortOptions}
              value={sortBy}
              onValueChange={setSortBy}
              placeholder="Sort articles"
              size="md"
              className="w-full"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="space-y-3 lg:hidden">
          {/* Search Row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                prefixIcon={Search}
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              className="flex px-4 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-gray-400 transition-all hover:border-primary/30 hover:text-white"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              <Filter size={18} />
            </button>
          </div>

          {/* Mobile Expanded Filters */}
          {showMobileSearch && (
            <div className="grid gap-3">
              {/* Category */}
              <Select
                prefixIcon={Filter}
                options={categories}
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                placeholder="Select category"
                searchable
                searchPlaceholder="Search category..."
                showDescription
                maxDropdownHeight={260}
              />

              {/* Sort */}
              <Select
                options={sortOptions}
                value={sortBy}
                onValueChange={setSortBy}
                placeholder="Sort articles"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default BlogsHeader;
