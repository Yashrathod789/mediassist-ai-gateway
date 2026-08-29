import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CircleCheck as CheckCircle2, Info, Loader as Loader2, ScanText, ShieldAlert, Upload, Circle as XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DropZone } from "./DropZone";
import { SelectedFileCard } from "./SelectedFileCard";
import { ExtractedTextCard } from "./ExtractedTextCard";
import {
  MAX_FILE_SIZE_MB,
  uploadReport,
  validateReportFile,
} from "@/lib/upload-api";
import {
  EXTRACTION_STAGES,
  STAGE_DURATION_MS,
  extractText,
  type ExtractionResult,
} from "@/lib/ocr-api";

type Stage = "idle" | "uploading" | "uploaded" | "extracting" | "extracted" | "error";

function stageLabel(progress: number): string {
  const index = Math.min(
    EXTRACTION_STAGES.length - 1,
    Math.floor((progress / 100) * (EXTRACTION_STAGES.length - 1)),
  );
  return EXTRACTION_STAGES[index]!.label;
}

/** Full upload experience: drop zone, validation, demo upload, OCR extraction and results. */
export function UploadReportPanel() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);

  const handleFileSelected = (selected: File | null) => {
    const message = validateReportFile(selected);
    if (message || !selected) {
      setFile(null);
      setError(message);
      return;
    }
    setError(null);
    setFile(selected);
    setStage("idle");
    setProgress(0);
    setExtraction(null);
  };

  const handleUpload = async () => {
    if (!file || stage !== "idle") return;
    const message = validateReportFile(file);
    if (message) {
      setError(message);
      return;
    }

    setStage("uploading");
    setProgress(0);
    try {
      await uploadReport(file, setProgress);
      setStage("uploaded");
    } catch {
      setError("Upload failed. Please try again.");
      setStage("idle");
    }
  };

  const handleExtract = async () => {
    if (!file || (stage !== "uploaded" && stage !== "error")) return;

    setError(null);
    setStage("extracting");
    setProgress(0);
    setExtraction(null);

    try {
      const result = await extractText(file, setProgress);
      setExtraction(result);
      setStage("extracted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Text extraction failed. Please try again.");
      setStage("error");
    }
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setProgress(0);
    setStage("idle");
    setExtraction(null);
  };

  const resetExtraction = () => {
    setProgress(0);
    setExtraction(null);
    setStage(file ? "uploaded" : "idle");
  };

  const busy = stage === "uploading" || stage === "extracting";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Upload Medical Report
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a medical report, then extract its text with simulated OCR before continuing to
            analysis.
          </p>
        </div>
        <Button asChild variant="outline" className="justify-self-start sm:justify-self-end">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </header>

      <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle>Select a report file</CardTitle>
          <CardDescription>
            Choose one file at a time. Nothing leaves your browser in this prototype.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stage !== "uploaded" && stage !== "extracting" && stage !== "extracted" && (
            <DropZone onFileSelected={handleFileSelected} disabled={busy} />
          )}

          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOCX, TXT, JPG, JPEG, PNG — maximum file size {MAX_FILE_SIZE_MB}{" "}
            MB.
          </p>

          <AnimatePresence>
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">{error}</span>
              </motion.p>
            )}
          </AnimatePresence>

          {file && (stage === "idle" || stage === "uploading" || stage === "error") && (
            <SelectedFileCard file={file} onRemove={reset} disabled={busy} />
          )}

          {stage === "uploading" && (
            <div aria-live="polite">
              <Progress value={progress} />
              <p className="mt-2 text-xs text-muted-foreground">Uploading… {progress}%</p>
            </div>
          )}

          {stage === "idle" && (
            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={!file}
              onClick={handleUpload}
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload Report
            </Button>
          )}

          {stage === "uploaded" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p
                role="status"
                className="flex items-start gap-2 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">Report uploaded successfully. Ready for text extraction.</span>
              </p>
              <SelectedFileCard file={file} onRemove={reset} />
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={handleExtract} size="lg">
                  <ScanText className="h-4 w-4" aria-hidden="true" />
                  Extract Text
                </Button>
                <Button variant="outline" onClick={reset}>
                  Choose Another File
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "extracting" && (
            <div aria-live="polite" className="space-y-3">
              <SelectedFileCard file={file} onRemove={reset} disabled />
              <Progress value={progress} />
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                {stageLabel(progress)}
              </p>
            </div>
          )}

          {stage === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p
                role="status"
                className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">
                  Text extraction could not be completed for this file.
                </span>
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={handleExtract}>
                  <Loader2 className="h-4 w-4" aria-hidden="true" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={resetExtraction}>
                  Choose Another File
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "extracted" && extraction && (
            <div className="space-y-4">
              <SelectedFileCard file={file} onRemove={reset} />
              <ExtractedTextCard
                result={extraction}
                onContinue={() => navigate({ to: "/processing" })}
                onReset={resetExtraction}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <p className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0">
          Academic project prototype — please use fictional or sample reports for demonstration. Do
          not upload real confidential patient information. Files stay in your browser and the OCR
          step is simulated.
        </span>
      </p>
    </div>
  );
}
