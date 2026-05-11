import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAdmin } from "./contexts/AdminContext";

const BlogsLayout = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const { isAdmin, blogs, handleLogout } = useAdmin();

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate("/blog/admin");
    } else {
      navigate("/blog/login");
    }
  };

  return (
    <div className="relative bg-black text-white w-full overflow-hidden min-h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* BODY */}
      <div className="relative max-w-7xl z-10 mx-auto px-4 lg:px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default BlogsLayout;
