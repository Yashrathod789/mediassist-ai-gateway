/**
 * Dashboard data layer (frontend demo data only).
 *
 * All values below are FICTIONAL placeholders for the academic prototype.
 * Later these functions can be swapped for real Axios calls, e.g.:
 *
 *   const { data } = await axios.get(`${API_BASE_URL}/dashboard/stats`);
 *   return data;
 */

export type ReportStatus = "Completed" | "Processing" | "Failed";

export type DashboardStats = {
  totalReports: number;
  completed: number;
  processing: number;
  recentReports: number;
};

export type ReportSummaryRow = {
  id: string;
  name: string;
  uploadedAt: string;
  status: ReportStatus;
};

export type ActivityItem = {
  id: string;
  label: string;
  timestamp: string;
};

export type ActivityPoint = { day: string; reports: number };

const DEMO_STATS: DashboardStats = {
  totalReports: 12,
  completed: 8,
  processing: 2,
  recentReports: 4,
};

const DEMO_REPORTS: ReportSummaryRow[] = [
  { id: "rpt-1041", name: "Blood Test Report", uploadedAt: "24 Aug 2026, 10:12", status: "Completed" },
  { id: "rpt-1040", name: "Annual Health Report", uploadedAt: "22 Aug 2026, 16:45", status: "Processing" },
  { id: "rpt-1039", name: "CBC Report", uploadedAt: "19 Aug 2026, 09:30", status: "Completed" },
  { id: "rpt-1038", name: "Lipid Profile Report", uploadedAt: "15 Aug 2026, 18:05", status: "Failed" },
];

const DEMO_ACTIVITY: ActivityItem[] = [
  { id: "act-1", label: "Medical report uploaded", timestamp: "24 Aug 2026, 10:12" },
  { id: "act-2", label: "Report processing completed", timestamp: "24 Aug 2026, 10:18" },
  { id: "act-3", label: "AI summary generated", timestamp: "24 Aug 2026, 10:19" },
  { id: "act-4", label: "Report viewed", timestamp: "23 Aug 2026, 20:04" },
];

const DEMO_CHART: ActivityPoint[] = [
  { day: "Mon", reports: 1 },
  { day: "Tue", reports: 2 },
  { day: "Wed", reports: 1 },
  { day: "Thu", reports: 3 },
  { day: "Fri", reports: 2 },
  { day: "Sat", reports: 1 },
  { day: "Sun", reports: 2 },
];

export async function getDashboardStats(): Promise<DashboardStats> {
  return DEMO_STATS;
}

export async function getRecentReports(): Promise<ReportSummaryRow[]> {
  return DEMO_REPORTS;
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  return DEMO_ACTIVITY;
}

export async function getReportActivity(): Promise<ActivityPoint[]> {
  return DEMO_CHART;
}
