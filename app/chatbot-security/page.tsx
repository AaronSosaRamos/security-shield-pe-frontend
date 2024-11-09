"use client";

import useAuthRedirect from "@/components/auth/useAuthRedirect";
import Chatbot from "@/components/Chatbot";
import Spinner from "@/components/Spinner";

export default function ChatbotScreen() {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return <Spinner />; 
  }

  return (
    <Chatbot />
  );
}
