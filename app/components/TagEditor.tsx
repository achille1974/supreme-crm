"use client";

import { useState } from "react";
import TagPill from "./TagPill";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function TagEditor({ value, onChange }: Props) {
  const [input, setInput] = useState("");

  function addTag() {
    const t = input.trim();
    if (!t) return;
    if (value.includes(t)) return;

    onChange([...value, t]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {value.map((tag) => (
          <div key={tag} className="flex items-center gap-1">
            <TagPill tag={tag} />
            <button
              className="text-red-600 text-[10px]"
              onClick={() => removeTag(tag)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 text-xs flex-grow"
          placeholder="Aggiungi tag..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
        />
        <button
          onClick={addTag}
          className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
        >
          Aggiungi
        </button>
      </div>
    </div>
  );
}