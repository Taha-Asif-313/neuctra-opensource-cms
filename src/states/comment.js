export const defaultComment = {
  id: "",

  postId: "",

  parentId: null, // for replies (thread system)

  user: {
    id: "",
    name: "",
    username: "",
    avatar: "",
  },

  content: "",

  likes: [],

  replies: [],

  isEdited: false,

  createdAt: "",
  updatedAt: "",
};