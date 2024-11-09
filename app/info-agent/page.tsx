"use client";

import useAuthRedirect from "@/components/auth/useAuthRedirect";
import SecurityInfoAgent from "@/components/InfoAgent";
import Spinner from "@/components/Spinner";

export default function ChatbotScreen() {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return <Spinner />; 
  }

  return (
    <SecurityInfoAgent />
  );
}
