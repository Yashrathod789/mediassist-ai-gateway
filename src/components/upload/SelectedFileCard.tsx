import { motion } from "motion/react";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatFileSize, getExtension } from "@/lib/upload-api";

type SelectedFileCardProps = {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
};

/** Details of the currently selected report file, with a remove action. */
export function SelectedFileCard({ file, onRemove, disabled = false }: SelectedFileCardProps) {
  const extension = getExtension(file.name).toUpperCase() || "FILE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground"
            aria-hidden="true"
          >
            <FileText className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {extension} · {formatFileSize(file.size)}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Remove ${file.name}`}
            onClick={onRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
