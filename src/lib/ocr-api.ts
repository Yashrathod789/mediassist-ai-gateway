/**
 * OCR / text-extraction data layer (frontend prototype only).
 *
 * No file leaves the browser at this stage. Later this can become a real
 * Axios call, e.g.:
 *
 *   const form = new FormData();
 *   form.append("report", file);
 *   const { data } = await axios.post(`${API_BASE_URL}/reports/extract`, form, {
 *     onUploadProgress: (e) => onProgress(Math.round((e.loaded / (e.total ?? 1)) * 100)),
 *   });
 *   return data;
 */

export type ExtractionStage = {
  id: string;
  label: string;
};

export const EXTRACTION_STAGES: ExtractionStage[] = [
  { id: "reading", label: "Reading document..." },
  { id: "extracting", label: "Extracting text..." },
  { id: "completed", label: "Text extraction completed." },
];

/** Time spent on each simulated stage in milliseconds. */
export const STAGE_DURATION_MS = 1100;

export type ExtractionResult = {
  reportId: string;
  fileName: string;
  extractedText: string;
  wordCount: number;
};

const DEMO_EXTRACTED_TEXT = `MEDICAL LABORATORY REPORT
------------------------------

Patient Name: Sample Patient
Patient ID: SP-2026-0042
Age / Sex: 34 / Female
Date of Report: 24 August 2026
Referring Doctor: Dr. A. Mehta

COMPLETE BLOOD COUNT (CBC)
------------------------------
Test                  Result    Reference Range
Haemoglobin (Hb)      11.2 g/dL  12.0 - 15.5
White Blood Cells     6.8 /nL    4.0 - 11.0
Platelets             220 /nL    150 - 450
Red Blood Cells       4.1 /pL    3.8 - 5.2
Hematocrit (HCT)      34%        36 - 46
MCV                   82 fL      80 - 100

LIPID PROFILE
------------------------------
Test                  Result    Reference Range
Total Cholesterol     190 mg/dL  < 200
Triglycerides         140 mg/dL  < 150
HDL Cholesterol       48 mg/dL   > 40
LDL Cholesterol       118 mg/dL  < 100

BLOOD GLUCOSE (Fasting)
------------------------------
Result: 96 mg/dL
Reference Range: 70 - 99

URINE ROUTINE
------------------------------
Colour: Pale yellow
Appearance: Clear
pH: 6.0
Protein: Nil
Glucose: Nil

NOTES
------------------------------
- Haemoglobin is slightly below the reference range.
- All other parameters are within normal limits.
- Please correlate clinically. This is a sample report for demonstration only.

End of Report`;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Simulated text extraction. Reports progress from 0 to 100 and resolves with
 * realistic demo medical-report text. Rejects ~8% of the time to let the UI
 * demonstrate its error state.
 */
export function extractText(
  file: File,
  onProgress: (percent: number) => void,
): Promise<ExtractionResult> {
  return new Promise((resolve, reject) => {
    let percent = 0;
    let elapsed = 0;

    const timer = setInterval(() => {
      const step = Math.random() * 20 + 8;
      percent = Math.min(100, percent + step);
      elapsed += STAGE_DURATION_MS;
      onProgress(Math.round(percent));

      if (percent >= 100) {
        clearInterval(timer);

        // Simulate an occasional extraction failure so the error state is reachable.
        if (Math.random() < 0.08) {
          reject(new Error("Could not extract text from this file. Please try a clearer or different report."));
          return;
        }

        setTimeout(
          () =>
            resolve({
              reportId: `demo-${Date.now()}`,
              fileName: file.name,
              extractedText: DEMO_EXTRACTED_TEXT,
              wordCount: countWords(DEMO_EXTRACTED_TEXT),
            }),
          300,
        );
      }
    }, STAGE_DURATION_MS / 3);
  });
}
