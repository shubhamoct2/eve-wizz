"use client"
import { useEffect, useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
}
