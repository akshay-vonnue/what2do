import { useEffect, useState } from "react";

export function useJwt() {
  const token = localStorage.getItem("token");

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        setIsTokenExpired(true);
      }
    };

    checkToken();
  }, [token]);

  return {
    isTokenExpired,
  };
}
