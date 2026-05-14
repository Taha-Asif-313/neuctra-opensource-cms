export const createBlock = (type) => {
  switch (type) {
    case "text":
      return {
        id: crypto.randomUUID(),
        type: "text",
        content: "",
      };

    case "heading":
      return {
        id: crypto.randomUUID(),
        type: "heading",
        content: "",
        level: "h1",
      };

    case "image":
      return {
        id: crypto.randomUUID(),
        type: "image",
        url: "",
        caption: "",
        width: "100%",
        height: 400,
        radius: 24,
        opacity: 1,
        objectFit: "cover",
      };

    case "code":
      return {
        id: crypto.randomUUID(),
        type: "code",
        language: "javascript",
        content: "",
      };

    case "table":
      return {
        id: crypto.randomUUID(),
        type: "table",
        headers: ["Column 1", "Column 2"],
        rows: [
          ["", ""],
          ["", ""],
        ],
      };

    default:
      return null;
  }
};
