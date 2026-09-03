import { useState } from "react";
import { Link } from "react-router-dom";

const reviews = [
  {
    id: "e462081e-5781-47bf-a6a8-8552949e9590",
    sender: "Customer",
    subject: "Refund Request for Property Payment",
    intent: "refund_request",
    classification: "NEEDS_REVIEW",
    confidence: "85%",
    status: "OPEN",
    date: "Sep 3, 2026",
  },
  {
    id: "a182081e-5781-47bf-a6a8-8552949e9591",
    sender: "Customer",
    subject: "Complaint About Property Payment",
    intent: "payment_complaint",
    classification: "NEEDS_REVIEW",
    confidence: "82%",
    status: "OPEN",
    date: "Sep 3, 2026",
  },
  {
    id: "b282081e-5781-47bf-a6a8-8552949e9592",
    sender: "Customer",
    subject: "Request to Cancel Property Transaction",
    intent: "transaction_cancellation",
    classification: "NEEDS_REVIEW",
    confidence: "79%",
    status: "OPEN",
    date: "Sep 2, 2026",
  },
  {
    id: "c382081e-5781-47bf-a6a8-8552949e9593",
    sender: "Customer",
    subject: "Dispute Regarding Property Charges",
    intent: "payment_dispute",
    classification: "NEEDS_REVIEW",
    confidence: "84%",
    status: "OPEN",
    date: "Sep 2, 2026",
  },
  {
    id: "d482081e-5781-47bf-a6a8-8552949e9594",
    sender: "Customer",
    subject: "Urgent Property Payment Issue",
    intent: "payment_issue",
    classification: "NEEDS_REVIEW",
    confidence: "81%",
    status: "OPEN",
    date: "Sep 1, 2026",
  },
  {
    id: "e582081e-5781-47bf-a6a8-8552949e9595",
    sender: "Customer",
    subject: "Request for Payment Reversal",
    intent: "payment_reversal",
    classification: "NEEDS_REVIEW",
    confidence: "76%",
    status: "OPEN",
    date: "Sep 1, 2026",
  },
  {
    id: "f682081e-5781-47bf-a6a8-8552949e9596",
    sender: "Customer",
    subject: "Incorrect Amount Charged for Property",
    intent: "incorrect_charge",
    classification: "NEEDS_REVIEW",
    confidence: "88%",
    status: "OPEN",
    date: "Aug 31, 2026",
  },
  {
    id: "g782081e-5781-47bf-a6a8-8552949e9597",
    sender: "Customer",
    subject: "Question About Previous Property Payment",
    intent: "payment_question",
    classification: "NEEDS_REVIEW",
    confidence: "83%",
    status: "OPEN",
    date: "Aug 31, 2026",
  },
  {
    id: "h882081e-5781-47bf-a6a8-8552949e9598",
    sender: "Customer",
    subject: "Property Contract Payment Dispute",
    intent: "contract_dispute",
    classification: "NEEDS_REVIEW",
    confidence: "80%",
    status: "OPEN",
    date: "Aug 30, 2026",
  },
  {
    id: "i982081e-5781-47bf-a6a8-8552949e9599",
    sender: "Customer",
    subject: "Refund Needed for Property Deposit",
    intent: "deposit_refund",
    classification: "NEEDS_REVIEW",
    confidence: "87%",
    status: "OPEN",
    date: "Aug 30, 2026",
  },
  {
    id: "j102081e-5781-47bf-a6a8-8552949e9600",
    sender: "Customer",
    subject: "Property Deposit Issue",
    intent: "deposit_issue",
    classification: "NEEDS_REVIEW",
    confidence: "78%",
    status: "OPEN",
    date: "Aug 29, 2026",
  },
  {
    id: "k112081e-5781-47bf-a6a8-8552949e9601",
    sender: "Customer",
    subject: "Request to Change Property Agreement",
    intent: "agreement_change",
    classification: "NEEDS_REVIEW",
    confidence: "74%",
    status: "OPEN",
    date: "Aug 29, 2026",
  },
  {
    id: "l122081e-5781-47bf-a6a8-8552949e9602",
    sender: "Customer",
    subject: "Issue With Property Invoice",
    intent: "invoice_issue",
    classification: "NEEDS_REVIEW",
    confidence: "86%",
    status: "OPEN",
    date: "Aug 28, 2026",
  },
  {
    id: "m132081e-5781-47bf-a6a8-8552949e9603",
    sender: "Customer",
    subject: "Request for Property Payment Clarification",
    intent: "payment_clarification",
    classification: "NEEDS_REVIEW",
    confidence: "89%",
    status: "OPEN",
    date: "Aug 28, 2026",
  },
  {
    id: "n142081e-5781-47bf-a6a8-8552949e9604",
    sender: "Customer",
    subject: "Property Purchase Payment Concern",
    intent: "purchase_payment_concern",
    classification: "NEEDS_REVIEW",
    confidence: "77%",
    status: "OPEN",
    date: "Aug 27, 2026",
  },
  {
    id: "o152081e-5781-47bf-a6a8-8552949e9605",
    sender: "Customer",
    subject: "Disputed Property Deposit",
    intent: "deposit_dispute",
    classification: "NEEDS_REVIEW",
    confidence: "83%",
    status: "OPEN",
    date: "Aug 27, 2026",
  },
  {
    id: "p162081e-5781-47bf-a6a8-8552949e9606",
    sender: "Customer",
    subject: "Property Payment Refund Follow Up",
    intent: "refund_follow_up",
    classification: "NEEDS_REVIEW",
    confidence: "91%",
    status: "OPEN",
    date: "Aug 26, 2026",
  },
  {
    id: "q172081e-5781-47bf-a6a8-8552949e9607",
    sender: "Customer",
    subject: "Concern About Property Transaction",
    intent: "transaction_concern",
    classification: "NEEDS_REVIEW",
    confidence: "80%",
    status: "OPEN",
    date: "Aug 26, 2026",
  },
  {
    id: "r182081e-5781-47bf-a6a8-8552949e9608",
    sender: "Customer",
    subject: "Request for Human Assistance With Payment",
    intent: "human_assistance",
    classification: "NEEDS_REVIEW",
    confidence: "75%",
    status: "OPEN",
    date: "Aug 25, 2026",
  },
  {
    id: "s192081e-5781-47bf-a6a8-8552949e9609",
    sender: "Customer",
    subject: "Property Payment Investigation Request",
    intent: "payment_investigation",
    classification: "NEEDS_REVIEW",
    confidence: "88%",
    status: "OPEN",
    date: "Aug 25, 2026",
  },
];

function Reviews() {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const visibleReviews = reviews.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const openReviews = reviews.filter(
    (review) => review.status === "OPEN"
  ).length;

  const needsReview = reviews.filter(
    (review) => review.classification === "NEEDS_REVIEW"
  ).length;

  const assignedReviews = reviews.filter(
    (review) => review.status === "ASSIGNED"
  ).length;

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  const firstRecord = startIndex + 1;

  const lastRecord = Math.min(
    startIndex + rowsPerPage,
    reviews.length
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Reviews
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Review emails that require human attention
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Open Reviews
          </p>

          <p className="mt-3 text-3xl font-bold text-gray-900">
            {openReviews}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Requires administrator attention
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Needs Review
          </p>

          <p className="mt-3 text-3xl font-bold text-gray-900">
            {needsReview}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Emails escalated by the AI
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Assigned
          </p>

          <p className="mt-3 text-3xl font-bold text-gray-900">
            {assignedReviews}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Reviews currently assigned
          </p>
        </div>
      </div>

      {/* Review Queue */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Human Review Queue
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Emails requiring human attention
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Sender
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Subject
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Intent
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Confidence
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {visibleReviews.map((review) => (
                <tr
                  key={review.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-gray-900">
                      {review.sender}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Review Case
                    </p>
                  </td>

                  <td className="max-w-xs px-6 py-5">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {review.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {review.classification}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {review.intent}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-gray-900">
                      {review.confidence}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      {review.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">
                    {review.date}
                  </td>

                  <td className="px-6 py-5">
                    <Link
                      to={`/reviews/${review.id}`}
                      className="inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {firstRecord}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-700">
                {lastRecord}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">
                {reviews.length}
              </span>{" "}
              reviews
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;