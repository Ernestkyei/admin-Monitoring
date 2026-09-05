import { useEffect, useState } from "react";

import StatCard from "../../components/StatCard";
import EmailBarChat from "../../components/EmailBarChat";
import DecisionPieChart from "../../components/DecisionPieChart";
import { getDashboard } from "../../endpoints/dashboard";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data.dashboard);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4 sm:space-y-8 sm:px-4 lg:px-6">
      {/* Page heading */}
      <div className="px-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Current activity of the AI Email Agent
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Emails"
          value={loading ? "..." : dashboard?.total_emails ?? 0}
          description="Emails received"
        />

        <StatCard
          title="In Remit"
          value={loading ? "..." : dashboard?.in_remit ?? 0}
          description="Matching company remit"
        />

        <StatCard
          title="Out of Remit"
          value={loading ? "..." : dashboard?.out_of_remit ?? 0}
          description="Outside company remit"
        />

        <StatCard
          title="Needs Review"
          value={loading ? "..." : dashboard?.needs_review ?? 0}
          description="Requires human attention"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="min-w-0">
          <EmailBarChat />
        </div>
        <div className="min-w-0">
          <DecisionPieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;