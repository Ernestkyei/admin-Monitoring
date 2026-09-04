import { apiRequest } from "../services/api";

const API_BASE = "";

export const API_REVIEWS_BASE = `${API_BASE}/reviews`;

export const REVIEW_ENDPOINTS = {
  GET_REVIEWS: `${API_REVIEWS_BASE}`,

  GET_REVIEW: (id) =>
    `${API_REVIEWS_BASE}/${id}`,

  GET_REVIEW_BY_EMAIL: (emailId) =>
    `${API_REVIEWS_BASE}/email/${emailId}`,

  UPDATE_REVIEW_STATUS: (id) =>
    `${API_REVIEWS_BASE}/${id}`,
};

export const getReviews = async () => {
  return apiRequest(
    REVIEW_ENDPOINTS.GET_REVIEWS,
    {
      method: "GET",
    }
  );
};

export const getReview = async (id) => {
  return apiRequest(
    REVIEW_ENDPOINTS.GET_REVIEW(id),
    {
      method: "GET",
    }
  );
};

export const getReviewByEmailId = async (emailId) => {
  return apiRequest(
    REVIEW_ENDPOINTS.GET_REVIEW_BY_EMAIL(emailId),
    {
      method: "GET",
    }
  );
};

export const updateReviewStatus = async (id, status) => {
  return apiRequest(
    REVIEW_ENDPOINTS.UPDATE_REVIEW_STATUS(id),
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    }
  );
};