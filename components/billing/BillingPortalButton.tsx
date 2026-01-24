"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Settings } from "lucide-react";

interface BillingPortalButtonProps {
  className?: string;
}

export default function BillingPortalButton({
  className = "",
}: BillingPortalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnUrl: window.location.href,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to open billing portal");
      }

      if (data.url) {
        // Redirect to Stripe Customer Portal
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Billing portal error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to open billing portal"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${className} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } transition-all inline-flex items-center gap-2`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Settings className="w-4 h-4" />
          Manage Subscription
        </>
      )}
    </button>
  );
}
