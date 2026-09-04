import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getReviews,
  updateReviewStatus,
} from "../../endpoints/reviews";

function Reviews() {
  const rowsPerPage = 5;

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchReviews() {
      try {
        const data = await getReviews();

        if (!cancelled) {
          setReviews(data.reviews || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading reviews:", err);

        if (!cancelled) {
          setError(err.message || "Failed to load review cases");
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      setError("");

      await updateReviewStatus(id, status);

      const data = await getReviews();

      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Error updating review:", err);

      setError(err.message || "Failed to update review status");
    }
  };

  const rows = reviews.length;

  const totalPages = Math.max(
    Math.ceil(rows / rowsPerPage),
    1
  );

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

  const firstRecord = rows === 0 ? 0 : startIndex + 1;

  const lastRecord = Math.min(
    startIndex + rowsPerPage,
    rows
  );

  if (loading) {
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

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading review cases...
          </p>
        </div>
      </div>
    );
  }

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

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

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
                      {review.sender_name || "Customer"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {review.sender_email || "Review Case"}
                    </p>

                  </td>

                  <td className="max-w-xs px-6 py-5">

                    <p className="truncate text-sm font-medium text-gray-900">
                      {review.subject || "No subject"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {review.classification || "NEEDS_REVIEW"}
                    </p>

                  </td>

                  <td className="px-6 py-5">

                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {review.intent || "restricted_request"}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span className="text-sm font-semibold text-gray-900">
                      {review.confidence
                        ? `${Math.round(
                            Number(review.confidence) * 100
                          )}%`
                        : "—"}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        review.status === "RESOLVED"
                          ? "bg-green-100 text-green-700"
                          : review.status === "ASSIGNED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {review.status}
                    </span>

                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">

                    {review.created_at
                      ? new Date(
                          review.created_at
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}

                  </td>

                  <td className="px-6 py-5">

                    {review.status === "OPEN" ? (

                      <div className="flex items-center gap-2">

                        <Link
                          to={`/reviews/${review.id}`}
                          className="inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                          Review
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(
                              review.id,
                              "RESOLVED"
                            )
                          }
                          className="inline-flex rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Resolve
                        </button>

                      </div>

                    ) : (

                      <Link
                        to={`/reviews/${review.id}`}
                        className="inline-flex rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        View
                      </Link>

                    )}

                  </td>

                </tr>

              ))}

              {visibleReviews.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >

                    <p className="text-sm font-medium text-gray-900">
                      No review cases found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Emails requiring human review will appear here.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {rows > 0 && totalPages > 1 && (

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
                {rows}
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
