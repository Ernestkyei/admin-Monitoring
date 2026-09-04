import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getReview,
  updateReviewStatus,
} from "../../endpoints/reviews";

function ReviewDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadReview = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getReview(id);

        if (!cancelled) {
          setReview(data.review);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading review:", err);

        if (!cancelled) {
          setError(err.message || "Failed to load review");
          setLoading(false);
        }
      }
    };

    loadReview();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleStatusUpdate = async (status) => {
    try {
      setError("");

      const data = await updateReviewStatus(id, status);

      setReview((currentReview) => ({
        ...currentReview,
        ...data.review,
      }));
    } catch (err) {
      console.error("Error updating review:", err);

      setError(err.message || "Failed to update review status");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Review Case
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Loading review...
          </h1>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading review details from the backend...
          </p>
        </div>
      </div>
    );
  }

  if (error && !review) {
    return (
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Review not found
        </h1>

        <p className="text-gray-600">
          {error}
        </p>

        <button
          type="button"
          onClick={() => navigate("/reviews")}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Reviews
        </button>
      </div>
    );
  }

  if (!review) {
    return null;
  }

  const sender =
    review.sender_name ||
    review.sender_email ||
    "Customer";

  const classification =
    review.classification ||
    "NEEDS_REVIEW";

  const intent =
    review.intent ||
    "—";

  const confidence =
    review.confidence !== null &&
    review.confidence !== undefined
      ? `${Math.round(Number(review.confidence) * 100)}%`
      : "—";

  const date = review.created_at
    ? new Date(review.created_at).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : "—";

  const description =
    review.body ||
    review.reason ||
    "No message content is available.";

  const summary =
    review.reason ||
    review.classification_reason ||
    "This review case requires human attention.";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Review Case
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {review.subject || "No subject"}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/reviews")}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Reviews
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              {review.status}
            </span>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              {classification}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            Customer Message
          </h2>

          <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-700">
            {description}
          </p>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">
              Review Reason
            </p>

            <p className="mt-2 leading-6 text-gray-700">
              {summary}
            </p>
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Sender
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {sender}
            </p>

            {review.sender_email && (
              <p className="mt-1 break-all text-sm text-gray-500">
                {review.sender_email}
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Intent
            </p>

            <p className="mt-2 text-base font-medium text-gray-900">
              {intent}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Confidence
            </p>

            <p className="mt-2 text-base font-semibold text-gray-900">
              {confidence}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Date
            </p>

            <p className="mt-2 text-base font-medium text-gray-900">
              {date}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Review ID
            </p>

            <p className="mt-2 break-all text-xs text-gray-500">
              {review.id}
            </p>
          </div>
        </aside>
      </div>

      {review.status !== "RESOLVED" && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleStatusUpdate("RESOLVED")}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
          >
            Resolve
          </button>

          <button
            type="button"
            onClick={() => navigate("/reviews")}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back to Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewDetails;

