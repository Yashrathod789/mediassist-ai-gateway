import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityPoint } from "@/lib/dashboard-api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const OPTIONS: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "rgba(120,140,150,0.15)" } },
    x: { grid: { display: false } },
  },
};

/** Weekly report-upload activity (application usage only, demo data). */
export function ReportActivityChart({ data }: { data: ActivityPoint[] }) {
  const chartData = {
    labels: data.map((point) => point.day),
    datasets: [
      {
        label: "Reports",
        data: data.map((point) => point.reports),
        backgroundColor: "oklch(0.58 0.11 195 / 0.75)",
        hoverBackgroundColor: "oklch(0.58 0.11 195)",
        borderRadius: 8,
        maxBarThickness: 42,
      },
    ],
  };

  return (
    <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader>
        <CardTitle>Report Activity</CardTitle>
        <CardDescription>Reports uploaded this week — demo data.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full sm:h-72">
          <Bar data={chartData} options={OPTIONS} />
        </div>
      </CardContent>
    </Card>
  );
}
