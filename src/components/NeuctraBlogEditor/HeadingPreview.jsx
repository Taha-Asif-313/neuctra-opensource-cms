/* =========================================
   HEADING PREVIEW
========================================= */

const HeadingPreview = ({ value = "", level = "h1" }) => {
  const levels = {
    h1: "text-5xl font-black",
    h2: "text-4xl font-bold",
    h3: "text-3xl font-bold",
    h4: "text-2xl font-semibold",
    h5: "text-xl font-semibold",
    h6: "text-lg font-medium",
  };

  const className = levels[level] || levels.h1;

  if (!value?.trim()) return null;

  return <div className={`text-foreground ${className}`}>{value}</div>;
};

export default HeadingPreview;
