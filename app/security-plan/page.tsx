"use client";

import useAuthRedirect from "@/components/auth/useAuthRedirect";
import SecurityPlanGenerator from "@/components/SecurityPlan";
import Spinner from "@/components/Spinner";

export default function SecurityPlanScreen() {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return <Spinner />; 
  }

  return (
    <SecurityPlanGenerator />
  );
}
