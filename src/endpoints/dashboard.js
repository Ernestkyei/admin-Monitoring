import { apiRequest } from "../services/api";

const API_BASE = "";

export const API_DASHBOARD_BASE = `${API_BASE}/dashboard`;

export const DASHBOARD_ENDPOINTS = {
  GET_DASHBOARD: `${API_DASHBOARD_BASE}`,
};

export const getDashboard = async () => {
  return apiRequest(DASHBOARD_ENDPOINTS.GET_DASHBOARD, {
    method: "GET",
  });
};