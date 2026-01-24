"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  priceId: string;
  planName: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function CheckoutButton({
  priceId,
  planName,
  children,
  className = "",
  disabled = false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!priceId) {
      toast.error("Invalid plan selected");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/settings?checkout=success`,
          cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // User not authenticated, redirect to sign in
          toast.error("Please sign in to upgrade your plan");
          router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
          return;
        }

        throw new Error(data.error?.message || "Failed to create checkout session");
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to start checkout"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || isLoading || !priceId}
      className={`${className} ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-lg hover:scale-105"
      } transition-all`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
