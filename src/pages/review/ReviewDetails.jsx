import { useNavigate, useParams } from "react-router-dom";

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
    description:
      "The customer is requesting a refund for a property payment and the AI flagged this for human review due to financial sensitivity.",
    summary:
      "Payment refund dispute requiring administrator review before approval or rejection.",
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
    description:
      "The customer disputes a property payment and requests a higher-level review of the transaction history.",
    summary:
      "Customer complaint about a property payment issue that needs manual investigation.",
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
    description:
      "The customer is asking to cancel a property transaction and the case requires manual validation.",
    summary:
      "Transaction cancellation request requires human review for account and legal check.",
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
    description:
      "The email raises a dispute about several property charges and may require refund or corrected billing action.",
    summary:
      "Charge dispute that needs manual review before a financial resolution is approved.",
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
    description:
      "The customer reports an urgent payment problem on a property-related transaction and asks for immediate help.",
    summary:
      "Urgent payment issue requiring human intervention because of compliance risk.",
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
    description:
      "This case requests a reversal of a property payment after a disputed charge and should be reviewed manually.",
    summary:
      "Payment reversal request flagged for human review due to financial impact.",
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
    description:
      "The customer claims the amount charged for a property is incorrect and requests investigation and correction.",
    summary:
      "Incorrect charge complaint requiring review before any adjustment is made.",
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
    description:
      "The customer is questioning a previous payment and is asking the team to clarify the records manually.",
    summary:
      "Historical payment question that requires a human review of the transaction ledger.",
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
    description:
      "The email discusses a property contract payment dispute and could involve contract obligations and billing errors.",
    summary:
      "Contract payment dispute requiring administrator review before any legal or financial action.",
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
    description:
      "The customer is requesting a refund of a property deposit and this case needs manual approval.",
    summary:
      "Deposit refund request that needs human review before approval.",
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
    description:
      "The customer reports a problem with a property deposit and wants a formal review of the records.",
    summary:
      "Deposit issue that needs account verification by a human reviewer.",
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
    description:
      "The customer wants to modify a property agreement and this change affects the current financial arrangement.",
    summary:
      "Agreement modification request requiring human review for validation.",
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
    description:
      "The email raises concerns about an invoice tied to a property transaction, which may require manual correction.",
    summary:
      "Property invoice issue that needs a human review before billing changes are made.",
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
    description:
      "The customer wants direct clarification about a property payment and the request is brief but sensitive and needs staff review.",
    summary:
      "Request for clarification on a property payment requiring manual response.",
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
    description:
      "The customer is concerned about a payment made for a property purchase and asks for a detailed review.",
    summary:
      "Purchase payment concern requiring reviewer confirmation before any action is taken.",
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
    description:
      "The customer disputes a property deposit, requiring manual review of the associated records and fee breakdown.",
    summary:
      "Disputed deposit requiring manual financial review.",
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
    description:
      "The customer is following up on an earlier refund request for a property payment and expects a human response.",
    summary:
      "Follow-up refund request that needs manual review for a final decision.",
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
    description:
      "The customer is concerned about the state of a property transaction and wants a human to assess the issue.",
    summary:
      "Transaction concern requiring reviewer intervention.",
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
    description:
      "The customer explicitly requests human assistance with a property payment matter and the AI escalated the case.",
    summary:
      "A customer requested human assistance for a payment issue that needs direct review.",
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
    description:
      "The customer is asking for a formal investigation of their property payment history and associated actions.",
    summary:
      "Payment investigation request requiring manual investigation and resolution.",
  },
];

function ReviewDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const review = reviews.find((item) => item.id === id);

  if (!review) {
    return (
      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Review not found
        </h1>

        <p className="text-gray-600">
          The review you are looking for does not exist or has been removed.
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Review Case
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {review.subject}
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

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              {review.status}
            </span>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              {review.classification}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            Customer Message
          </h2>

          <p className="mt-4 leading-7 text-gray-700">
            {review.description}
          </p>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">
              Summary
            </p>

            <p className="mt-2 leading-6 text-gray-700">
              {review.summary}
            </p>
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Sender
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {review.sender}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Intent
            </p>

            <p className="mt-2 text-base font-medium text-gray-900">
              {review.intent}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Confidence
            </p>

            <p className="mt-2 text-base font-semibold text-gray-900">
              {review.confidence}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Date
            </p>

            <p className="mt-2 text-base font-medium text-gray-900">
              {review.date}
            </p>
          </div>
        </aside>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
        >
          Approve
        </button>

        <button
          type="button"
          className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default ReviewDetails;