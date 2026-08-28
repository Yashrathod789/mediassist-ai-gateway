/**
 * Report summary data layer (frontend prototype only).
 *
 * All content below is fictional demo data. Later this becomes a real call:
 *
 *   const { data } = await axios.get(`${API_BASE_URL}/reports/${id}/summary`);
 *   return data;
 */

export type ReportSummary = {
  reportName: string;
  reportType: string;
  processedAt: string;
  keyFindings: string[];
  patientExplanation: string[];
  terms: { term: string; meaning: string }[];
  suggestedQuestions: string[];
};

const DEMO_SUMMARY: ReportSummary = {
  reportName: "Sample_Blood_Report.pdf",
  reportType: "Complete Blood Count (sample)",
  processedAt: "Demo data — not a real analysis",
  keyFindings: [
    "Haemoglobin is slightly below the reference range.",
    "White blood cell count is within the normal range.",
    "Platelet count is within the normal range.",
    "No critical values were flagged in this sample report.",
  ],
  patientExplanation: [
    "This sample report looks mostly normal. One value, haemoglobin, is a little lower than the usual range.",
    "Haemoglobin carries oxygen around your body. A slightly low value can sometimes make a person feel tired, but on its own it does not confirm any condition.",
    "The other measurements in this report — the cells that fight infection and the cells that help blood clot — are in their usual ranges.",
  ],
  terms: [
    { term: "Haemoglobin", meaning: "The protein in red blood cells that carries oxygen." },
    { term: "WBC", meaning: "White blood cells, which help the body fight infection." },
    { term: "Platelets", meaning: "Small blood cells that help your blood clot." },
    { term: "Reference range", meaning: "The typical range of values seen in healthy people." },
  ],
  suggestedQuestions: [
    "What could cause a slightly low haemoglobin value?",
    "Do any of these results need a repeat test?",
    "Which lifestyle or diet factors relate to these values?",
  ],
};

export function getReportSummary(): Promise<ReportSummary> {
  return new Promise((resolve) => setTimeout(() => resolve(DEMO_SUMMARY), 250));
}
