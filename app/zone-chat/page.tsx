"use client";

import useAuthRedirect from "@/components/auth/useAuthRedirect";
import GroupChat from "@/components/GroupChat";
import Spinner from "@/components/Spinner";

export default function SecurityPlanScreen() {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return <Spinner />; 
  }

  return (
    <GroupChat />
  );
}
