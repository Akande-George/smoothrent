"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileUpload({
  label,
  accept = "image/*",
  multiple = false,
  maxFiles = 5,
  className,
  onChange,
}: {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
  onChange?: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const fileArray = Array.from(newFiles).slice(0, maxFiles - files.length);
      const updated = [...files, ...fileArray];
      setFiles(updated);
      onChange?.(updated);
    },
    [files, maxFiles, onChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      const updated = files.filter((_, i) => i !== index);
      setFiles(updated);
      onChange?.(updated);
    },
    [files, onChange]
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/10 bg-white/50 px-6 py-8 text-center transition-colors",
          isDragging && "border-accent bg-accent/5"
        )}
      >
        <Upload className="h-8 w-8 text-muted" />
        <p className="text-sm text-muted">
          Drag & drop files here, or{" "}
          <label className="cursor-pointer font-semibold text-foreground hover:underline">
            browse
            <input
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </p>
        <p className="text-xs text-muted">Max {maxFiles} files</p>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs"
            >
              <FileImage className="h-3.5 w-3.5 text-muted" />
              <span className="max-w-[120px] truncate text-foreground">{file.name}</span>
              <button onClick={() => removeFile(i)} className="text-muted hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
