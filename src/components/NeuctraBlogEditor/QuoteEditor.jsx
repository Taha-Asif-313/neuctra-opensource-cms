import React from "react";
import { Quote } from "lucide-react";
import { Input, Textarea, Select } from "@neuctra/ui";

const QuoteEditor = ({
  type = "quote",
  arabic = "",
  translation = "",
  reference = "",
  source = "",
  onChange,
}) => {
  const update = (data) => {
    onChange?.({
      type,
      arabic,
      translation,
      reference,
      source,
      ...data,
    });
  };

  return (
    <div className="border border-white/10 rounded-xl bg-black/20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-white/80">
          <Quote size={16} />
          <span className="text-sm">Reference</span>
        </div>

        <Select
          value={type}
          onChange={(e) => update({ type: e.target.value })}
          options={[
            { value: "quote", label: "Quote" },
            { value: "ayah", label: "Ayah" },
            { value: "hadith", label: "Hadith" },
            { value: "custom", label: "Custom" },
          ]}
          className="w-36"
        />
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <Textarea
          value={arabic}
          onChange={(e) => update({ arabic: e.target.value })}
          placeholder="Arabic..."
          className="text-right"
        />

        <Textarea
          value={translation}
          onChange={(e) => update({ translation: e.target.value })}
          placeholder="Translation..."
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            value={reference}
            onChange={(e) => update({ reference: e.target.value })}
            placeholder="Reference"
          />

          <Input
            value={source}
            onChange={(e) => update({ source: e.target.value })}
            placeholder="Source"
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteEditor;