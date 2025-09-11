import { useState } from "react";
import { fetchWithAuth } from "./useFetchUser";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const method = (options.method || "GET").toLowerCase();
    const token = window.localStorage.getItem("token");

    // Reject non-GET requests if no token
    if (method !== "get" && !token) {
      setError("User is not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      const response = await (token ? fetchWithAuth(url, options) : fetch(url, options));

      if (!response.ok)
        throw new Error(`Request failed with status ${response.status}`);

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    get: {
      questions: () =>
        handleRequest("https://quiz-tpjgk.ondigitalocean.app/api/quiz"),
      question: (id) => {
        if (!id) throw new Error("No id provided");
        return handleRequest(
          `https://quiz-tpjgk.ondigitalocean.app/api/quiz/${id}`
        );
      },
    },
    post: {
      questions: (payload) =>
        handleRequest("https://quiz-tpjgk.ondigitalocean.app/api/quiz", {
          method: "POST",
          body: JSON.stringify(payload),
        }),
    },
    del: {
      user: (id) => {
        if (!id) throw new Error("No id provided");
        return handleRequest(
          `https://quiz-tpjgk.ondigitalocean.app/api/user/${id}`,
          {
            method: "DELETE",
          }
        );
      },
      questions: (id) => {
        if (!id) throw new Error("No id provided");
        return handleRequest(
          `https://quiz-tpjgk.ondigitalocean.app/api/quiz/${id}`,
          {
            method: "DELETE",
          }
        );
      },
    },
    data,
    error,
    isLoading,
  };
};

export default useFetch;
