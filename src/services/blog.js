import { use } from "react";
import { authix } from "../utils/neuctraAuthix";

/* =========================================================
   CREATE BLOG
========================================================= */
export const createBlog = async (userId, blog) => {
  try {
    const response = await authix.addUserData({
      userId,
      dataCategory: "blog",
      data: blog,
    });

    return response;
  } catch (error) {
    console.error("Create Blog Error:", error);
    throw error;
  }
};

/* =========================================================
   GET ALL BLOGS
========================================================= */
export const getAllBlogs = async () => {
  try {
    const blogs = await authix.getUsersData("blog");

    return {
      success: true,
      data: blogs.data || [],
    };
  } catch (error) {
    console.error("Get Blogs Error:", error);

    return {
      success: false,
      error,
    };
  }
};

/* =========================================================
   GET SINGLE BLOG
========================================================= */
export const getSingleBlog = async (userId,dataId) => {
  try {
    const blog = await authix.getSingleUserData({
      userId,
      dataId,
    });

    return blog;
  } catch (error) {
    console.error("Get Single Blog Error:", error);

    return {
      success: false,
      error,
    };
  }
};

/* =========================================================
   GET BLOGS BY USER
========================================================= */
export const getUserBlogs = async (userId) => {
  try {
    const blogs = await authix.searchAppDataByKeys({
      category: "blogs",
      userId,
    });

    return {
      success: true,
      data: blogs || [],
    };
  } catch (error) {
    console.error("Get User Blogs Error:", error);

    return {
      success: false,
      error,
    };
  }
};

/* =========================================================
   UPDATE BLOG
========================================================= */
export const updateBlog = async ({
  dataId,
  title,
  content,
  coverImage,
  tags,
  published,
}) => {
  try {
    const response = await authix.updateAppData({
      dataId,
      data: {
        ...(title && {
          title,
          slug: title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-"),
        }),

        ...(content && { content }),
        ...(coverImage && { coverImage }),
        ...(tags && { tags }),

        ...(published !== undefined && { published }),

        updatedAt: new Date().toISOString(),
      },
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Update Blog Error:", error);

    return {
      success: false,
      error,
    };
  }
};

/* =========================================================
   DELETE BLOG
========================================================= */
export const deleteBlog = async (userId, dataId) => {
  try {
    await authix.deleteUserData({
      userId,
      dataId,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete Blog Error:", error);

    return {
      success: false,
      error,
    };
  }
};

/* =========================================================
   SEARCH BLOGS
========================================================= */
export const searchBlogs = async (query) => {
  try {
    const blogs = await authix.searchAppDataByKeys({
      category: "blogs",
      q: query,
    });

    return {
      success: true,
      data: blogs || [],
    };
  } catch (error) {
    console.error("Search Blogs Error:", error);

    return {
      success: false,
      error,
    };
  }
};
