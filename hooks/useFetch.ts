"use client";
import { CustomError } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { use, useEffect, useState } from "react";

// useFetch hook type with generic type

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      setLoading(true);
      axios
        .get<T>(url)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            const err = error as AxiosError<CustomError>;
            setError(err.response?.data.message || "An error occurred");
          } else {
            setError("An error occurred");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [url]);

  return { data, loading, error };
};
