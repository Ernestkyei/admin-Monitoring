import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getStoredEmails } from "../../endpoints/emails";

function EmailDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // LOAD EMAIL DETAILS
  // ========================================

  useEffect(() => {
    const loadEmail = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStoredEmails();

        if (
          data.success &&
          Array.isArray(data.data)
        ) {
          const foundEmail = data.data.find(
            (item) => item.id === id
          );

          if (!foundEmail) {
            setError(
              "The email you are looking for could not be found."
            );
            return;
          }

          console.log(
            "EMAIL DETAILS FROM API:",
            foundEmail
          );

          console.log(
            "RECORDED AI RESPONSE:",
            foundEmail.response_body
          );

          console.log(
            "RESPONSE STATUS:",
            foundEmail.response_status
          );

          console.log(
            "RESPONSE SENT AT:",
            foundEmail.response_sent_at
          );

          const formattedEmail = {
            id: foundEmail.id,

            sender:
              foundEmail.sender_name ||
              "Unknown",

            email:
              foundEmail.sender_email ||
              "",

            subject:
              foundEmail.subject ||
              "(No subject)",

            body:
              foundEmail.body ||
              "(No message content available.)",

            // ========================================
            // AI CLASSIFICATION
            // ========================================

            classification:
              foundEmail.classification ||
              "PENDING",

            confidence:
              foundEmail.confidence !== undefined &&
              foundEmail.confidence !== null
                ? Math.round(
                    Number(foundEmail.confidence) * 100
                  )
                : null,

            intent:
              foundEmail.intent ||
              "Not available",

            reason:
              foundEmail.classification_reason ||
              "No AI classification reason available.",

            // ========================================
            // AI DECISION
            // ========================================

            decision:
              foundEmail.decision ||
              "PENDING",

            decisionReason:
              foundEmail.decision_reason ||
              "No decision reason available.",

            // ========================================
            // AI RESPONSE
            // ========================================

            response:
              foundEmail.response_body ||
              null,

            responseStatus:
              foundEmail.response_status ||
              null,

            responseSentAt:
              foundEmail.response_sent_at ||
              null,

            responseCreatedAt:
              foundEmail.response_created_at ||
              null,

            // ========================================
            // DATE
            // ========================================

            date:
              foundEmail.received_at
                ? new Date(
                    foundEmail.received_at
                  ).toLocaleString()
                : "Date unavailable",
          };

          setEmail(formattedEmail);
        } else {
          setError(
            "Failed to load email details."
          );
        }
      } catch (error) {
        console.error(
          "Failed to load email details:",
          error
        );

        setError(
          error.message ||
            "Failed to load email details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmail();
  }, [id]);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/emails")}
          className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to Emails
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading email details...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // EMAIL NOT FOUND
  // ========================================

  if (!email) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/emails")}
          className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to Emails
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">
            Email Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error ||
              "The email you are looking for could not be found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ========================================
          HEADER
      ======================================== */}

      <div>
        <button
          type="button"
          onClick={() => navigate("/emails")}
          className="mb-4 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          ← Back to Emails
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          Email Details
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Complete processing details for this email
        </p>
      </div>

      {/* ========================================
          ORIGINAL EMAIL
      ======================================== */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Original Email
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Email received by the AI Email Agent
          </p>
        </div>

        <div className="space-y-6 p-6">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sender
              </p>

              <p className="mt-2 text-sm font-medium text-gray-900">
                {email.sender}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {email.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </p>

              <p className="mt-2 text-sm text-gray-900">
                {email.date}
              </p>
            </div>

          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Subject
            </p>

            <p className="mt-2 text-base font-semibold text-gray-900">
              {email.subject}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Message
            </p>

            <div className="mt-3 whitespace-pre-line rounded-lg bg-gray-50 p-5 text-sm leading-7 text-gray-700">
              {email.body}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================
          AI ANALYSIS
      ======================================== */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-lg font-semibold text-gray-900">
            AI Analysis
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Classification and reasoning produced by the AI
          </p>

        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Classification
            </p>

            <div className="mt-3">
              <ClassificationBadge
                classification={email.classification}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Intent
            </p>

            <p className="mt-3 text-sm font-medium text-gray-900">
              {email.intent}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Confidence
            </p>

            <p className="mt-3 text-lg font-bold text-gray-900">
              {email.confidence !== null
                ? `${email.confidence}%`
                : "Pending"}
            </p>
          </div>

          <div className="md:col-span-3">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              AI Reason
            </p>

            <div className="mt-3 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              {email.reason}
            </div>

          </div>

        </div>
      </div>

      {/* ========================================
          AI DECISION
      ======================================== */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <h2 className="text-lg font-semibold text-gray-900">
            AI Decision
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Action determined by the decision engine
          </p>

        </div>

        <div className="space-y-4 p-6">

          <DecisionBadge
            decision={email.decision}
          />

          {email.decision === "AUTOMATE" && (
            <p className="text-sm text-gray-600">
              The AI determined that this email can be handled automatically.
            </p>
          )}

          {email.decision === "ESCALATE" && (
            <p className="text-sm text-gray-600">
              The AI determined that this email requires human attention. No automated response was sent.
            </p>
          )}

          {email.decision === "NO_ACTION" && (
            <p className="text-sm text-gray-600">
              The AI determined that no customer-facing response should be sent.
            </p>
          )}

          {email.decisionReason &&
            email.decision !== "PENDING" && (
              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Decision Reason
                </p>

                <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {email.decisionReason}
                </div>

              </div>
            )}

        </div>
      </div>

      {/* ========================================
          AI RESPONSE
      ======================================== */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                AI Response
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Response generated and sent by the AI Email Agent
              </p>
            </div>

            {/* RESPONSE STATUS */}

            {email.responseStatus === "SENT" ? (

              <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                ✓ RESPONSE SENT
              </span>

            ) : email.responseStatus === "PENDING" ? (

              <span className="inline-flex w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                RESPONSE PENDING
              </span>

            ) : email.response ? (

              <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                ✓ RESPONSE RECORDED
              </span>

            ) : (

              <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                NO RESPONSE SENT
              </span>

            )}

          </div>
        </div>

        <div className="p-6">

          {email.response ? (

            <div className="space-y-5">

              {/* ACTUAL AI RESPONSE */}

              <div className="rounded-lg border border-green-200 bg-green-50 p-5">

                <div className="mb-3">

                  <p className="text-sm font-semibold text-green-800">
                    AI-generated response
                  </p>

                </div>

                <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                  {email.response}
                </p>

              </div>

              {/* RESPONSE INFORMATION */}

              <div className="space-y-2 text-sm">

                {email.responseStatus === "SENT" && (
                  <div className="flex flex-wrap items-center gap-2 text-green-700">

                    <span className="font-semibold">
                      ✓ Response successfully sent
                    </span>

                    <span className="text-gray-400">
                      •
                    </span>

                    <span className="text-gray-600">
                      The customer received the automated response.
                    </span>

                  </div>
                )}

                {email.responseSentAt && (
                  <div className="text-gray-500">

                    <span className="font-medium text-gray-700">
                      Sent at:
                    </span>{" "}

                    {new Date(
                      email.responseSentAt
                    ).toLocaleString()}

                  </div>
                )}

              </div>

            </div>

          ) : email.responseStatus === "PENDING" ? (

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5">

              <p className="text-sm font-medium text-yellow-800">
                Response generated and awaiting delivery.
              </p>

              <p className="mt-2 text-sm text-yellow-700">
                The AI response has been recorded but has not yet been confirmed as sent.
              </p>

            </div>

          ) : (

            <div className="rounded-lg bg-gray-50 p-5">

              <p className="text-sm font-medium text-gray-700">
                No automated response was sent.
              </p>

              {email.decision === "ESCALATE" && (
                <p className="mt-2 text-sm text-gray-500">
                  This email was escalated for human review.
                </p>
              )}

              {email.decision === "NO_ACTION" && (
                <p className="mt-2 text-sm text-gray-500">
                  No customer-facing response was required for this email.
                </p>
              )}

            </div>

          )}

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

export default EmailDetails;

