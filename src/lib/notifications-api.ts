/**
 * Notifications data layer (frontend prototype only).
 *
 * All values below are FICTIONAL placeholders for the academic prototype.
 * Later these functions can be swapped for real Axios calls, e.g.:
 *
 *   const { data } = await axios.get(`${API_BASE_URL}/notifications`);
 *   return data;
 */

export type NotificationType =
  | "report_processing"
  | "report_completed"
  | "summary_generated"
  | "account_update";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "ntf-001",
    type: "report_completed",
    title: "Report processing completed",
    message: "Blood Test Report has been processed and is ready to review.",
    timestamp: "24 Aug 2026, 10:18",
    read: false,
  },
  {
    id: "ntf-002",
    type: "summary_generated",
    title: "AI summary generated",
    message: "A patient-friendly summary is available for CBC Report.",
    timestamp: "24 Aug 2026, 10:19",
    read: false,
  },
  {
    id: "ntf-003",
    type: "report_processing",
    title: "Report is being processed",
    message: "Annual Health Report is currently moving through the analysis pipeline.",
    timestamp: "22 Aug 2026, 16:45",
    read: false,
  },
  {
    id: "ntf-004",
    type: "account_update",
    title: "Profile updated",
    message: "Your account details were updated successfully.",
    timestamp: "21 Aug 2026, 09:02",
    read: true,
  },
  {
    id: "ntf-005",
    type: "report_completed",
    title: "Report processing completed",
    message: "Lipid Profile Report has been processed and is ready to review.",
    timestamp: "19 Aug 2026, 09:31",
    read: true,
  },
  {
    id: "ntf-006",
    type: "summary_generated",
    title: "AI summary generated",
    message: "A patient-friendly summary is available for Blood Test Report.",
    timestamp: "19 Aug 2026, 09:33",
    read: true,
  },
];

export async function getNotifications(): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return DEMO_NOTIFICATIONS.map((n) => ({ ...n }));
}
