/**
 * Demo report-history data layer (frontend prototype only).
 *
 * Later this becomes a real call:
 *
 *   const { data } = await axios.get(`${API_BASE_URL}/reports`);
 *   return data;
 */

export type ReportStatus = "completed" | "processing";

export type ReportHistoryItem = {
  id: string;
  name: string;
  reportType: string;
  fileType: string;
  uploadedAt: string;
  status: ReportStatus;
};

export const DEMO_REPORT_HISTORY: ReportHistoryItem[] = [
  {
    id: "rpt-001",
    name: "Sample_Blood_Report.pdf",
    reportType: "Blood Test",
    fileType: "PDF",
    uploadedAt: "12 Aug 2026",
    status: "completed",
  },
  {
    id: "rpt-002",
    name: "Sample_Health_Report.pdf",
    reportType: "General Health Report",
    fileType: "PDF",
    uploadedAt: "19 Aug 2026",
    status: "completed",
  },
  {
    id: "rpt-003",
    name: "Sample_Test_Report.pdf",
    reportType: "Laboratory Report",
    fileType: "PDF",
    uploadedAt: "27 Aug 2026",
    status: "processing",
  },
];

export type StatusFilter = "all" | ReportStatus;

export const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "processing", label: "Processing" },
];

export const STATUS_LABEL: Record<ReportStatus, string> = {
  completed: "Completed",
  processing: "Processing",
};

export function filterReports(
  reports: ReportHistoryItem[],
  search: string,
  status: StatusFilter,
): ReportHistoryItem[] {
  const query = search.trim().toLowerCase();
  return reports.filter((report) => {
    const matchesStatus = status === "all" || report.status === status;
    const matchesSearch = query.length === 0 || report.name.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });
}
