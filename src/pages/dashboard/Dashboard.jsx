import StatCard from "../../components/StatCard";
import EmailBarChat from "../../components/EmailBarChat";
import DecisionPieChart from "../../components/DecisionPieChart";

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Current activity of the AI Email Agent
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Emails"
          value="3"
          description="Emails received"
        />

        <StatCard
          title="In Remit"
          value="1"
          description="Matching company remit"
        />

        <StatCard
          title="Out of Remit"
          value="1"
          description="Outside company remit"
        />

        <StatCard
          title="Needs Review"
          value="1"
          description="Requires human attention"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <EmailBarChat />
        <DecisionPieChart />
      </div>
    </div>
  );
}

export default Dashboard;