/**
 * Upload data layer (frontend prototype only).
 *
 * No file leaves the browser at this stage. Later this can become a real
 * Axios call, e.g.:
 *
 *   const form = new FormData();
 *   form.append("report", file);
 *   const { data } = await axios.post(`${API_BASE_URL}/reports/upload`, form, {
 *     onUploadProgress: (e) => onProgress(Math.round((e.loaded / (e.total ?? 1)) * 100)),
 *   });
 *   return data;
 */

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const SUPPORTED_EXTENSIONS = ["pdf", "docx", "txt", "jpg", "jpeg", "png"] as const;

export const ACCEPT_ATTRIBUTE =
  ".pdf,.docx,.txt,.jpg,.jpeg,.png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/jpeg,image/png";

const SUPPORTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
];

export const UNSUPPORTED_MESSAGE =
  "Unsupported file format. Please upload PDF, DOCX, TXT, JPG, JPEG or PNG.";

export function getExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1]!.toLowerCase() : "";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Returns an error message when the file is not acceptable, otherwise null. */
export function validateReportFile(file: File | null | undefined): string | null {
  if (!file) return "No file selected. Please choose a medical report to upload.";

  const extension = getExtension(file.name);
  const extensionOk = (SUPPORTED_EXTENSIONS as readonly string[]).includes(extension);
  const mimeOk = file.type === "" || SUPPORTED_MIME_TYPES.includes(file.type);

  if (!extensionOk || !mimeOk) return UNSUPPORTED_MESSAGE;
  if (file.size === 0) return "This file appears to be empty. Please select a valid report file.";
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large (${formatFileSize(file.size)}). Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`;
  }

  return null;
}

export type UploadResult = { reportId: string; fileName: string };

/** Simulated upload used by the prototype; reports progress from 0 to 100. */
export function uploadReport(
  file: File,
  onProgress: (percent: number) => void,
): Promise<UploadResult> {
  return new Promise((resolve) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent = Math.min(100, percent + Math.random() * 18 + 7);
      onProgress(Math.round(percent));
      if (percent >= 100) {
        clearInterval(timer);
        setTimeout(
          () =>
            resolve({
              reportId: `demo-${Date.now()}`,
              fileName: file.name,
            }),
          300,
        );
      }
    }, 180);
  });
}
