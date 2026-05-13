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
      };

    case "quote":
      return {
        id: crypto.randomUUID(),
        type: "quote",
        content: "",
      };

    case "list":
      return {
        id: crypto.randomUUID(),
        type: "list",
        items: [""],
      };

    case "image":
      return {
        id: crypto.randomUUID(),
        type: "image",
        url: "",
        caption: "",
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