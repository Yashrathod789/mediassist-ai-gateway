import { motion } from "motion/react";
import { CircleAlert as AlertCircle, Copy, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ExtractionResult } from "@/lib/ocr-api";

type ExtractedTextCardProps = {
  result: ExtractionResult;
  onContinue: () => void;
  onReset: () => void;
};

export function ExtractedTextCard({ result, onContinue, onReset }: ExtractedTextCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.extractedText);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — fail silently.
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result.extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.fileName.replace(/\.[^.]+$/, "")}-extracted.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
            Demo OCR / Extracted Text
          </CardTitle>
          <CardDescription>
            Review the extracted content before continuing. This is fictional demo text, not a real
            medical analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{result.wordCount} words</Badge>
            <Badge variant="outline">From {result.fileName}</Badge>
          </div>

          <ScrollArea className="h-72 w-full rounded-xl border border-border bg-background/60 p-4">
            <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground">
              {result.extractedText}
            </pre>
          </ScrollArea>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button type="button" variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy Text
            </Button>
            <Button type="button" variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Text
            </Button>
            <div className="sm:grow" />
            <Button type="button" onClick={onContinue}>
              Continue to Analysis
            </Button>
            <Button type="button" variant="ghost" onClick={onReset}>
              Start Over
            </Button>
          </div>

          <p className="flex items-start gap-2 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0">
              The extracted text above is sample content for the academic prototype. No real OCR
              engine is running.
            </span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
