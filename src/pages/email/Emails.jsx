import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  receiveEmails,
  getStoredEmails,
} from "../../endpoints/emails";

import { toast } from "react-toastify";

function Emails() {
  const navigate = useNavigate();

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Show 5 emails per page
  const rowsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  // ========================================
  // LOAD STORED EMAILS
  // ========================================

  const loadStoredEmails = async () => {
    try {
      const data = await getStoredEmails();

      if (data.success && Array.isArray(data.data)) {
        const formattedEmails = data.data.map((email) => ({
          id: email.id,

          sender:
            email.sender_name || "Unknown",

          email:
            email.sender_email || "",

          subject:
            email.subject || "(No subject)",

          classification:
            email.classification || "PENDING",

          confidence:
            email.confidence !== undefined &&
            email.confidence !== null
              ? Math.round(Number(email.confidence) * 100)
              : null,

          decision:
            email.decision || "PENDING",

          receivedAt:
            email.received_at || null,
        }));

        // ========================================
        // SORT BY AI PROCESSING STATUS
        // ========================================
        //
        // Display order:
        //
        // 1. IN_REMIT
        // 2. OUT_OF_REMIT
        // 3. NEEDS_REVIEW
        // 4. PENDING
        //
        // The actual classification comes from
        // the backend/database.
        //
        // This object ONLY controls the order in
        // which classifications appear in the UI.
        // ========================================

        const classificationPriority = {
          IN_REMIT: 1,
          OUT_OF_REMIT: 2,
          NEEDS_REVIEW: 3,
          PENDING: 4,
        };

        formattedEmails.sort((a, b) => {
          const priorityA =
            classificationPriority[a.classification] || 4;

          const priorityB =
            classificationPriority[b.classification] || 4;

          // First sort by classification
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          // If classification is the same,
          // newest email comes first.
          const dateA = a.receivedAt
            ? new Date(a.receivedAt).getTime()
            : 0;

          const dateB = b.receivedAt
            ? new Date(b.receivedAt).getTime()
            : 0;

          return dateB - dateA;
        });

        setEmails(formattedEmails);
      } else {
        setEmails([]);
      }
    } catch (error) {
      console.error(
        "Failed to load stored emails:",
        error
      );

      toast.error(
        error.message ||
          "Failed to load stored emails."
      );
    }
  };

  // ========================================
  // LOAD EMAILS WHEN PAGE OPENS
  // ========================================

  useEffect(() => {
    const loadEmails = async () => {
      try {
        setInitialLoading(true);

        await loadStoredEmails();

        setCurrentPage(1);
      } finally {
        setInitialLoading(false);
      }
    };

    loadEmails();
  }, []);

  // ========================================
  // REFRESH DATABASE EMAILS
  // ========================================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await loadStoredEmails();

      // Always return to first page
      setCurrentPage(1);

      toast.success(
        "Emails refreshed successfully."
      );
    } catch (error) {
      console.error(
        "Failed to refresh emails:",
        error
      );

      toast.error(
        error.message ||
          "Failed to refresh emails."
      );
    } finally {
      setRefreshing(false);
    }
  };

  // ========================================
  // SYNC GMAIL EMAILS
  // ========================================

  const handleSyncEmails = async () => {
    try {
      setLoading(true);

      const syncData =
        await receiveEmails();

      // Reload database after Gmail sync
      await loadStoredEmails();

      // Show newest emails
      setCurrentPage(1);

      toast.success(
        `${
          syncData.savedCount || 0
        } new email(s) synced successfully.`
      );
    } catch (error) {
      console.error(
        "Failed to sync emails:",
        error
      );

      toast.error(
        error.message ||
          "Failed to sync emails."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // PAGINATION
  // ========================================

  const totalPages = Math.ceil(
    emails.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const visibleEmails =
    emails.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(
        page + 1,
        totalPages || 1
      )
    );
  };

  const firstRecord =
    emails.length === 0
      ? 0
      : startIndex + 1;

  const lastRecord = Math.min(
    startIndex + rowsPerPage,
    emails.length
  );

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Processed Emails
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and monitor emails processed by the AI Email Agent
          </p>
        </div>

        <div className="flex gap-3">

          {/* REFRESH DATABASE */}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

          {/* SYNC GMAIL */}

          <button
            type="button"
            onClick={handleSyncEmails}
            disabled={loading}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Syncing..."
              : "Sync Emails"}
          </button>

        </div>
      </div>

      {/* EMAIL TABLE */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Sender
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Classification
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Confidence
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Decision
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {initialLoading ? (

                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    Loading emails...
                  </td>
                </tr>

              ) : visibleEmails.length > 0 ? (

                visibleEmails.map((email) => (

                  <tr
                    key={email.id}
                    onClick={() =>
                      navigate(
                        `/emails/${email.id}`
                      )
                    }
                    className="cursor-pointer transition hover:bg-gray-50"
                  >

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-gray-900">
                      {email.sender}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                      {email.email}
                    </td>

                    <td className="max-w-xs px-6 py-5 text-sm text-gray-900">
                      <div className="truncate">
                        {email.subject}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <ClassificationBadge
                        classification={
                          email.classification
                        }
                      />
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-gray-900">
                      {email.confidence !== null
                        ? `${email.confidence}%`
                        : "Pending"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <DecisionBadge
                        decision={
                          email.decision
                        }
                      />
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No emails found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-gray-500">

            Showing{" "}

            <span className="font-medium text-gray-700">
              {firstRecord}
            </span>

            {" "}to{" "}

            <span className="font-medium text-gray-700">
              {lastRecord}
            </span>

            {" "}of{" "}

            <span className="font-medium text-gray-700">
              {emails.length}
            </span>

            {" "}emails

          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3 text-sm text-gray-500">
              Page {currentPage} of{" "}
              {totalPages || 1}
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={
                currentPage === totalPages ||
                emails.length === 0
              }
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

// ========================================
// CLASSIFICATION BADGE
// ========================================

function ClassificationBadge({
  classification,
}) {
  const styles = {
    IN_REMIT:
      "bg-green-100 text-green-700",

    OUT_OF_REMIT:
      "bg-gray-100 text-gray-600",

    NEEDS_REVIEW:
      "bg-yellow-100 text-yellow-700",

    PENDING:
      "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[classification] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {classification}
    </span>
  );
}

// ========================================
// DECISION BADGE
// ========================================

function DecisionBadge({
  decision,
}) {
  const styles = {
    AUTOMATE:
      "bg-blue-100 text-blue-700",

    NO_ACTION:
      "bg-gray-100 text-gray-600",

    ESCALATE:
      "bg-red-100 text-red-700",

    PENDING:
      "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[decision] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {decision}
    </span>
  );
}

export default Emails;