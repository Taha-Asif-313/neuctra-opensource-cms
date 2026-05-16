export const defaultBlogState = (overrides = {}) => ({
  id: "",
  slug: "",

  title: "",

  coverImage: "",

  authorId: "",
  author: {
    name: "",
    username: "",
    avatar: "",
    ...(overrides.author || {}),
  },

  category: "React",
  tags: [],

  blocks: [],

  featured: false,

  visibility: "public",

  readTime: 0,

  views: 0,
  likes: [],
  bookmarks: [],

  commentsCount: 0,

  createdAt: "",
  updatedAt: "",
  publishedAt: "",

  ...overrides,
});