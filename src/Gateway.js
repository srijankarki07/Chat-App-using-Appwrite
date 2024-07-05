"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./utils/AuthContext";
import InnerLayout from "./InnerLayout";

const GateWay = ({ children }) => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return !user ? <Login /> : <>{children}</>;
};

export default GateWay;
