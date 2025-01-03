import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export const WithAuth = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, authToken } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const authTokenHasBeenCheck = typeof authToken === "string";
    if (!isAuthenticated && authTokenHasBeenCheck) {
      router.replace("/login");
    }
  }, [isAuthenticated, authToken, router]);

  return children;
};
