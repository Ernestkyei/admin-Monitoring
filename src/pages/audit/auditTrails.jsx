import { useState } from "react";

import {
  ClipboardList,
  Mail,
  Brain,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function AuditTrails() {
  const auditRecords = [
    {
      id: 1,
      timestamp: "Sep 3, 2026 • 10:43 AM",
      action: "Response Sent",
      type: "RESPONSE",
      description: "Automated response successfully sent to customer",
      subject: "Inquiry About 3 Bedroom Property",
      status: "SUCCESS",
    },
    {
      id: 2,
      timestamp: "Sep 3, 2026 • 10:42 AM",
      action: "Automated Decision",
      type: "DECISION",
      description: "Email approved for automated processing",
      subject: "Inquiry About 3 Bedroom Property",
      status: "AUTOMATE",
    },
    {
      id: 3,
      timestamp: "Sep 3, 2026 • 10:42 AM",
      action: "AI Classification",
      type: "AI",
      description: "Email classified as IN_REMIT with 97% confidence",
      subject: "Inquiry About 3 Bedroom Property",
      status: "IN_REMIT",
    },
    {
      id: 4,
      timestamp: "Sep 3, 2026 • 10:42 AM",
      action: "Email Received",
      type: "EMAIL",
      description: "New email received from customer@example.com",
      subject: "Inquiry About 3 Bedroom Property",
      status: "RECEIVED",
    },
    {
      id: 5,
      timestamp: "Sep 3, 2026 • 10:35 AM",
      action: "No Action",
      type: "DECISION",
      description:
        "No automated response sent because email is outside company remit",
      subject: "Thanks for your interest in GitHub Universe 2026!",
      status: "NO_ACTION",
    },
    {
      id: 6,
      timestamp: "Sep 3, 2026 • 10:35 AM",
      action: "AI Classification",
      type: "AI",
      description: "Email classified as OUT_OF_REMIT with 98% confidence",
      subject: "Thanks for your interest in GitHub Universe 2026!",
      status: "OUT_OF_REMIT",
    },
    {
      id: 7,
      timestamp: "Sep 3, 2026 • 10:35 AM",
      action: "Email Received",
      type: "EMAIL",
      description: "New email received from noreply@github.com",
      subject: "Thanks for your interest in GitHub Universe 2026!",
      status: "RECEIVED",
    },
    {
      id: 8,
      timestamp: "Sep 3, 2026 • 10:28 AM",
      action: "Review Case Created",
      type: "REVIEW",
      description:
        "Human review required. Review case created successfully",
      subject: "Refund Request for Property Payment",
      status: "OPEN",
    },
    {
      id: 9,
      timestamp: "Sep 3, 2026 • 10:28 AM",
      action: "AI Classification",
      type: "AI",
      description: "Email classified as NEEDS_REVIEW with 85% confidence",
      subject: "Refund Request for Property Payment",
      status: "NEEDS_REVIEW",
    },
    {
      id: 10,
      timestamp: "Sep 3, 2026 • 10:28 AM",
      action: "Email Received",
      type: "EMAIL",
      description: "New email received from customer@example.com",
      subject: "Refund Request for Property Payment",
      status: "RECEIVED",
    },
  ];

  const recordsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    auditRecords.length / recordsPerPage
  );

  const startIndex = (currentPage - 1) * recordsPerPage;

  const currentRecords = auditRecords.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case "EMAIL":
        return <Mail size={16} />;

      case "AI":
        return <Brain size={16} />;

      case "DECISION":
        return <CheckCircle size={16} />;

      case "REVIEW":
        return <AlertTriangle size={16} />;

      case "RESPONSE":
        return <Mail size={16} />;

      default:
        return <ClipboardList size={16} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "SUCCESS":
      case "AUTOMATE":
      case "IN_REMIT":
        return "bg-green-100 text-green-700";

      case "NO_ACTION":
      case "OUT_OF_REMIT":
        return "bg-gray-100 text-gray-700";

      case "NEEDS_REVIEW":
      case "OPEN":
        return "bg-yellow-100 text-yellow-700";

      case "RECEIVED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Audit Trails
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor system activity and track important actions performed by
          the AI Email Agent.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Events
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {auditRecords.length}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Recorded system activities
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            AI Decisions
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            3
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Classification and decisions
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Responses Sent
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            1
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Automated responses
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Review Cases
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            1
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Cases requiring attention
          </p>
        </div>
      </div>

      {/* Audit Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <ClipboardList
              size={21}
              className="text-gray-600"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                System Activity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recent activities recorded by the AI Email Agent.
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Timestamp
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Subject
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {currentRecords.map((record) => (
                <tr
                  key={record.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Timestamp */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {record.timestamp}
                  </td>

                  {/* Action */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        {getTypeIcon(record.type)}
                      </div>

                      <span className="text-sm font-medium text-gray-900">
                        {record.action}
                      </span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {record.type}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="min-w-[280px] px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {record.description}
                    </p>
                  </td>

                  {/* Subject */}
                  <td className="min-w-[260px] px-6 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {record.subject}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700">
              {Math.min(
                startIndex + recordsPerPage,
                auditRecords.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700">
              {auditRecords.length}
            </span>{" "}
            records
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(page - 1, 1))
              }
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />

              Previous
            </button>

            {/* Page Numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next

              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditTrails;