/**
 * Processing pipeline data layer (frontend prototype only).
 *
 * Nothing is sent anywhere. Later this can poll a real backend, e.g.:
 *
 *   const { data } = await axios.get(`${API_BASE_URL}/reports/${id}/status`);
 *   return data.stages;
 */

export type StageStatus = "done" | "active" | "pending";

export type ProcessingStage = {
  id: string;
  label: string;
  description: string;
};

export const PROCESSING_STAGES: ProcessingStage[] = [
  {
    id: "uploaded",
    label: "Report Uploaded",
    description: "The selected report file was received by the prototype.",
  },
  {
    id: "extraction",
    label: "Text Extraction",
    description: "Reading text content from the report document.",
  },
  {
    id: "preprocessing",
    label: "NLP Preprocessing",
    description: "Cleaning, tokenizing and normalizing the extracted text.",
  },
  {
    id: "summarization",
    label: "AI Summarization",
    description: "Condensing the report into key clinical points.",
  },
  {
    id: "explanation",
    label: "Patient-Friendly Explanation",
    description: "Rewriting the summary in simple, everyday language.",
  },
  {
    id: "complete",
    label: "Complete",
    description: "The summary is ready to review.",
  },
];

/** Simulated stage duration in milliseconds for the demo pipeline. */
export const STAGE_DURATION_MS = 1600;

export function getStageStatus(index: number, currentIndex: number): StageStatus {
  if (index < currentIndex) return "done";
  if (index === currentIndex) return "active";
  return "pending";
}
