import { useState } from "react";

const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleRequest = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);

    if (
      options.method &&
      options.method.toLowerCase() !== "get" &&
      !isAuthenticated
    ) {
      setError("User is not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(url, { ...options });
      if (!response.ok) {
        throw new Error(`Failed to ${options.method || "fetch"} resource`);
      }
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

  const get = {
    questions: () =>
      handleRequest(`https://quiz-tpjgk.ondigitalocean.app/quiz`),
    question: (id) =>
      id
        ? handleRequest(`https://quiz-tpjgk.ondigitalocean.app/quiz/${id}`)
        : setError("No id provided"),
  };

  const post = {
    questions: (product) =>
      handleRequest(`https://quiz-tpjgk.ondigitalocean.app/quiz`, {
        method: "POST",
        body: JSON.stringify(product),
      }),
  };

  
  const del = {
    user: (id) =>
      id
        ? handleRequest(`https://quiz-tpjgk.ondigitalocean.app/user/${id}`, {
            method: "DELETE",
          })
        : setError("No id provided"),

    questions: (id) =>
      id
        ? handleRequest(`https://quiz-tpjgk.ondigitalocean.app/quiz/${id}`, {
            method: "DELETE",
          })
        : setError("No id provided"),
  };

  return {
    get,
    post,
    del,
    data,
    error,
    isLoading,
  };
};

export default useFetch;
