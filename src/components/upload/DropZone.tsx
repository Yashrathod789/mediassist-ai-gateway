import { useRef, useState } from "react";
import { motion } from "motion/react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ACCEPT_ATTRIBUTE } from "@/lib/upload-api";

type DropZoneProps = {
  onFileSelected: (file: File | null) => void;
  disabled?: boolean;
};

/** Large drag-and-drop area with a fallback file browser button. */
export function DropZone({ onFileSelected, disabled = false }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload a medical report by dragging a file here or browsing your device"
        aria-disabled={disabled}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragActive(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          if (disabled) return;
          const file = event.dataTransfer.files?.[0] ?? null;
          onFileSelected(file);
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-colors sm:px-8 sm:py-14",
          dragActive
            ? "border-primary bg-accent"
            : "border-border bg-background/60 hover:border-primary/60 hover:bg-accent/40",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <motion.span
          animate={{ scale: dragActive ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-brand)" }}
          aria-hidden="true"
        >
          <UploadCloud className="h-7 w-7" />
        </motion.span>

        <div className="min-w-0">
          <p className="text-base font-semibold tracking-tight sm:text-lg">
            Drag &amp; drop your medical report here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">or browse files from your device</p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={(event) => {
            event.stopPropagation();
            openPicker();
          }}
        >
          Browse Files
        </Button>

        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={ACCEPT_ATTRIBUTE}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            onFileSelected(file);
            event.target.value = "";
          }}
        />
      </div>
    </motion.div>
  );
}
