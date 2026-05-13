import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

/* =========================================
   HEADING EDITOR
========================================= */

const HeadingEditor = ({
  value = "",
  level = "h1",
  onChange,
  onLevelChange,
  placeholder = "Heading...",
}) => {
  const levels = [
    {
      value: "h1",
      icon: Heading1,
      label: "H1",
      className: "text-5xl font-black",
    },
    {
      value: "h2",
      icon: Heading2,
      label: "H2",
      className: "text-4xl font-bold",
    },
    {
      value: "h3",
      icon: Heading3,
      label: "H3",
      className: "text-3xl font-bold",
    },
    {
      value: "h4",
      icon: Heading4,
      label: "H4",
      className: "text-2xl font-semibold",
    },
    {
      value: "h5",
      icon: Heading5,
      label: "H5",
      className: "text-xl font-semibold",
    },
    {
      value: "h6",
      icon: Heading6,
      label: "H6",
      className: "text-lg font-medium",
    },
  ];

  const current = levels.find((item) => item.value === level) || levels[0];

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-white/10 bg-white/2">
        {levels.map((item) => {
          const active = level === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onLevelChange(item.value)}
              className={`
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-xl
                border
                transition-all
                duration-200

                ${
                  active
                    ? `
                      border-white/20
                      bg-white/10
                      text-white
                      shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
                    `
                    : `
                      border-white/10
                      bg-white/3
                      text-white/60
                      hover:bg-white/6
                      hover:text-white/90
                    `
                }
              `}
            >
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* INPUT */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full
          bg-transparent
          outline-none
          p-5
          text-white
          placeholder:text-white/30
          transition-all

          ${current.className}
        `}
      />
    </div>
  );
};

export default HeadingEditor;
