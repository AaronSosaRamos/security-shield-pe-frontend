"use client";

import useAuthRedirect from "@/components/auth/useAuthRedirect";
import GeolocationInfo from "@/components/GeolocationInfo";
import Spinner from "@/components/Spinner";

export default function GeoInfoScreen() {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return <Spinner />;
  }

  return (
      <GeolocationInfo />
  );
}
