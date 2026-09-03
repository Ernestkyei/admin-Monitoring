import { useNavigate, useParams } from "react-router-dom";

const emails = [
  {
    id: "email-1",
    sender: "Customer",
    email: "customer@example.com",
    subject: "Inquiry About 3 Bedroom Property",
    body: `Hello,

I saw your 3 bedroom property listing and I would like to know if the property is still available.

I would also like to schedule a viewing.

Thank you.`,
    classification: "IN_REMIT",
    confidence: 97,
    intent: "property_inquiry",
    reason:
      "The email is asking about property availability and scheduling a viewing, which is within the company's remit.",
    decision: "AUTOMATE",
    response: `Thank you for reaching out about our 3-bedroom listing. I’m currently checking the status of the property and will have a member of our team contact you shortly to confirm availability and arrange a viewing at a time that suits you.

If you have any additional questions in the meantime, please let us know.`,
    responseStatus: "SENT",
    date: "Sep 3, 2026",
  },
  {
    id: "email-2",
    sender: "GitHub",
    email: "noreply@github.com",
    subject: "Thanks for your interest in GitHub Universe 2026!",
    body: `Hello,

Thank you for your interest in GitHub Universe 2026.

We look forward to seeing you at the event.`,
    classification: "OUT_OF_REMIT",
    confidence: 98,
    intent: "event_promotion",
    reason:
      "The email is related to a GitHub event and is unrelated to the company's business remit.",
    decision: "NO_ACTION",
    response: null,
    responseStatus: "NOT_SENT",
    date: "Sep 3, 2026",
  },
  {
    id: "email-3",
    sender: "Customer",
    email: "customer@example.com",
    subject: "Refund Request for Property Payment",
    body: `Hello,

I made a payment toward a property, but I believe I was charged the wrong amount.

I would like a refund and would like someone from the company to investigate this issue.

Thank you.`,
    classification: "NEEDS_REVIEW",
    confidence: 85,
    intent: "refund_request",
    reason:
      "The email involves a property payment and refund request. Because financial matters require human review, the AI escalated the case.",
    decision: "ESCALATE",
    response: null,
    responseStatus: "NOT_SENT",
    date: "Sep 3, 2026",
  },
  {
    id: "email-4",
    sender: "Customer",
    email: "customer@example.com",
    subject: "Property Viewing Request for Saturday",
    body: `Hello,

I am interested in viewing the property this Saturday.

Please let me know what time would be available.

Thank you.`,
    classification: "IN_REMIT",
    confidence: 94,
    intent: "property_viewing",
    reason:
      "The customer is requesting a property viewing, which is within the company's remit.",
    decision: "AUTOMATE",
    response: `Thank you for your interest in viewing the property. A member of our team will contact you to confirm the available viewing times for Saturday.

We look forward to assisting you.`,
    responseStatus: "SENT",
    date: "Sep 2, 2026",
  },
  {
    id: "email-5",
    sender: "Supplier",
    email: "sales@builder.com",
    subject: "Updated Property Marketing Materials",
    body: `Hello,

Please find attached our updated property marketing materials.

Let us know if you need any additional information.

Regards,
Sales Team`,
    classification: "OUT_OF_REMIT",
    confidence: 96,
    intent: "supplier_marketing",
    reason:
      "The message is a supplier marketing communication and does not require an automated customer response.",
    decision: "NO_ACTION",
    response: null,
    responseStatus: "NOT_SENT",
    date: "Sep 2, 2026",
  },
];

function EmailDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const email = emails.find((item) => item.id === id);

  if (!email) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/emails")}
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Emails
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">
            Email Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The email you are looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Email information */}
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

      {/* AI Analysis */}
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
              {email.confidence}%
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

      {/* Decision */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            AI Decision
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Action determined by the decision engine
          </p>
        </div>

        <div className="p-6">
          <DecisionBadge decision={email.decision} />

          {email.decision === "AUTOMATE" && (
            <p className="mt-3 text-sm text-gray-600">
              The AI determined that this email can be handled
              automatically.
            </p>
          )}

          {email.decision === "ESCALATE" && (
            <p className="mt-3 text-sm text-gray-600">
              The AI determined that this email requires human
              attention. No automated response was sent.
            </p>
          )}

          {email.decision === "NO_ACTION" && (
            <p className="mt-3 text-sm text-gray-600">
              The AI determined that no customer-facing response
              should be sent.
            </p>
          )}
        </div>
      </div>

      {/* AI Response */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                AI Response
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Response generated by the AI Email Agent
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                email.responseStatus === "SENT"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {email.responseStatus === "SENT"
                ? "RESPONSE SENT"
                : "NO RESPONSE SENT"}
            </span>
          </div>
        </div>

        <div className="p-6">
          {email.response ? (
            <div className="rounded-lg bg-gray-50 p-5">
              <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {email.response}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClassificationBadge({ classification }) {
  const styles = {
    IN_REMIT: "bg-green-100 text-green-700",
    OUT_OF_REMIT: "bg-gray-100 text-gray-600",
    NEEDS_REVIEW: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[classification] || "bg-gray-100 text-gray-600"
      }`}
    >
      {classification}
    </span>
  );
}

function DecisionBadge({ decision }) {
  const styles = {
    AUTOMATE: "bg-blue-100 text-blue-700",
    NO_ACTION: "bg-gray-100 text-gray-600",
    ESCALATE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[decision] || "bg-gray-100 text-gray-600"
      }`}
    >
      {decision}
    </span>
  );
}

export default EmailDetails;
