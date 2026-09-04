import { apiRequest } from "../services/api";

const API_BASE = "";

export const API_AUDIT_BASE = `${API_BASE}/audit`;

export const AUDIT_ENDPOINTS = {
  GET_AUDITS: `${API_AUDIT_BASE}`,
};

export const getAuditLogs = async () => {
  return apiRequest(AUDIT_ENDPOINTS.GET_AUDITS, {
    method: "GET",
  });
};