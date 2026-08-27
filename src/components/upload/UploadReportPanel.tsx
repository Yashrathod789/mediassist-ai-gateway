import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Info, Loader2, ShieldAlert, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DropZone } from "./DropZone";
import { SelectedFileCard } from "./SelectedFileCard";
import { MAX_FILE_SIZE_MB, uploadReport, validateReportFile } from "@/lib/upload-api";

type UploadState = "idle" | "uploading" | "success";

/** Full upload experience: drop zone, validation, demo upload and success state. */
export function UploadReportPanel() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);

  const handleFileSelected = (selected: File | null) => {
    const message = validateReportFile(selected);
    if (message || !selected) {
      setFile(null);
      setError(message);
      return;
    }
    setError(null);
    setFile(selected);
    setState("idle");
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file || state !== "idle") return;
    const message = validateReportFile(file);
    if (message) {
      setError(message);
      return;
    }

    setState("uploading");
    setProgress(0);
    await uploadReport(file, setProgress);
    setState("success");
  };

  const reset = () => {
    setFile(null);
    setError(null);
    setProgress(0);
    setState("idle");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Upload Medical Report
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your medical report to begin AI-powered text analysis and generate a
            patient-friendly summary.
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
            Choose one file at a time. Nothing is uploaded until you select Upload Report.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state !== "success" && (
            <DropZone onFileSelected={handleFileSelected} disabled={state === "uploading"} />
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

          {file && (
            <SelectedFileCard
              file={file}
              onRemove={reset}
              disabled={state === "uploading"}
            />
          )}

          {state === "uploading" && (
            <div aria-live="polite">
              <Progress value={progress} />
              <p className="mt-2 text-xs text-muted-foreground">Uploading… {progress}%</p>
            </div>
          )}

          {state === "success" ? (
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
                <span className="min-w-0">Report uploaded successfully. Ready for processing.</span>
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={() => navigate({ to: "/processing" })}>
                  Continue to Processing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" onClick={reset}>
                  Upload Another Report
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={!file || state === "uploading"}
              onClick={handleUpload}
            >
              {state === "uploading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Upload Report
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      <p className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0">
          Academic project prototype — please use fictional or sample reports for demonstration. Do
          not upload real confidential patient information. Files stay in your browser during this
          stage and are not sent anywhere.
        </span>
      </p>
    </div>
  );
}
