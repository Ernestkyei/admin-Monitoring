import { apiRequest } from "../services/api";

const API_BASE = "";

export const API_EMAILS_BASE = `${API_BASE}/emails`;

export const EMAIL_ENDPOINTS = {
  RECEIVE_EMAILS: `${API_EMAILS_BASE}`,

  CLASSIFY_EMAILS: `${API_EMAILS_BASE}/classify`,

  GMAIL_TEST: `${API_EMAILS_BASE}/gmail-test`,

  GROQ_MODELS: `${API_EMAILS_BASE}/groq-models`,

  GROQ_TEST: `${API_EMAILS_BASE}/groq-test`,

  GMAIL_MESSAGE: (id) =>
    `${API_EMAILS_BASE}/gmail-message-test/${id}`,

  EMAIL_DETAILS: (id) =>
    `${API_EMAILS_BASE}/gmail-email-details/${id}`,
};

// ========================================
// SYNC GMAIL EMAILS
// POST /api/emails
// ========================================

export const receiveEmails = async () => {
  return apiRequest(
    EMAIL_ENDPOINTS.RECEIVE_EMAILS,
    {
      method: "POST",
    }
  );
};

// ========================================
// GET STORED EMAILS
// GET /api/emails
// ========================================

export const getStoredEmails = async () => {
  return apiRequest(
    EMAIL_ENDPOINTS.RECEIVE_EMAILS,
    {
      method: "GET",
    }
  );
};

// ========================================
// CLASSIFY EMAILS
// POST /api/emails/classify
// ========================================

export const classifyEmails = async () => {
  return apiRequest(
    EMAIL_ENDPOINTS.CLASSIFY_EMAILS,
    {
      method: "POST",
    }
  );
};

// ========================================
// TEST GMAIL CONNECTION
// GET /api/emails/gmail-test
// ========================================

export const testGmailConnection = async () => {
  return apiRequest(
    EMAIL_ENDPOINTS.GMAIL_TEST,
    {
      method: "GET",
    }
  );
};

// ========================================
// GET GROQ MODELS
// GET /api/emails/groq-models
// ========================================

export const getGroqModels = async () => {
  return apiRequest(
    EMAIL_ENDPOINTS.GROQ_MODELS,
    {
      method: "GET",
    }
  );
};

// ========================================
// TEST GROQ CONNECTION
// GET /api/emails/groq-test
// ========================================

export const testGroqConnection = async () => {
  return apiRequest(
    EMAIL_ENDPOINTS.GROQ_TEST,
    {
      method: "GET",
    }
  );
};

// ========================================
// GET GMAIL MESSAGE
// GET /api/emails/gmail-message-test/:id
// ========================================

export const getGmailMessage = async (id) => {
  return apiRequest(
    EMAIL_ENDPOINTS.GMAIL_MESSAGE(id),
    {
      method: "GET",
    }
  );
};

// ========================================
// GET EMAIL DETAILS
// GET /api/emails/gmail-email-details/:id
// ========================================

export const getEmailDetails = async (id) => {
  return apiRequest(
    EMAIL_ENDPOINTS.EMAIL_DETAILS(id),
    {
      method: "GET",
    }
  );
};

