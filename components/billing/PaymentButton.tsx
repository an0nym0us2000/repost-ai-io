"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, CreditCard } from "lucide-react";

interface PaymentButtonProps {
  priceId?: string; // Stripe price ID
  planId?: string; // PayPal plan ID
  planName: string;
  provider: "stripe" | "paypal";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function PaymentButton({
  priceId,
  planId,
  planName,
  provider,
  children,
  className = "",
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    const id = provider === "stripe" ? priceId : planId;

    if (!id) {
      toast.error("Invalid plan selected");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint =
        provider === "stripe"
          ? "/api/billing/checkout"
          : "/api/billing/paypal/checkout";

      const payload =
        provider === "stripe"
          ? {
              priceId: id,
              successUrl: `${window.location.origin}/settings?checkout=success`,
              cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
            }
          : {
              planId: id,
              successUrl: `${window.location.origin}/api/billing/paypal/success`,
              cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in to upgrade your plan");
          router.push(
            `/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`
          );
          return;
        }

        throw new Error(
          data.error?.message || "Failed to create checkout session"
        );
      }

      if (data.url) {
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

  const defaultContent = (
    <>
      <CreditCard className="w-4 h-4" />
      {provider === "stripe" ? "Pay with Card" : "Pay with PayPal"}
    </>
  );

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || isLoading || (!priceId && !planId)}
      className={`${className} ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-lg hover:scale-105"
      } transition-all inline-flex items-center justify-center gap-2`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </span>
      ) : (
        children || defaultContent
      )}
    </button>
  );
}
