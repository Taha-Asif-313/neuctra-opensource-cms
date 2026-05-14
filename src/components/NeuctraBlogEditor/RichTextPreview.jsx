import { Type } from "lucide-react";

const RichTextPreview = ({ value = "" }) => {
  const hasContent =
    value && value.replace(/<p><br><\/p>|<p><\/p>|<br>/gi, "").trim();

  if (!hasContent) return null;

  return (
    <div className="border-t border-white/10">
      {/* HEADER */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/2 px-5 py-3">
        <Type size={14} className="text-white/40" />
        <span className="text-xs font-medium uppercase tracking-wide text-white/50">
          Live Preview
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div
          className="
            prose prose-invert max-w-none text-white/80
            prose-p:text-white/80
            prose-strong:text-white
            prose-headings:text-white
            prose-li:text-white/80

            [&_blockquote]:border-l-2
            [&_blockquote]:border-cyan-400/60
            [&_blockquote]:pl-4
            [&_blockquote]:italic
            [&_blockquote]:text-white/70
          "
          dangerouslySetInnerHTML={{ __html: value || "" }}
        />
      </div>
    </div>
  );
};

export default RichTextPreview;