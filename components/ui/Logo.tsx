import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  priority?: boolean;
}

export default function Logo({
  size = 32,
  className = "",
  showText = true,
  textClassName = "",
  priority = false,
}: LogoProps) {
  return (
    <>
      <Image
        src="/logo.png"
        alt="Repost AI Logo"
        width={size}
        height={size}
        className={cn("rounded-lg", className)}
        priority={priority}
      />
      {showText && (
        <span className={cn("text-xl font-bold text-text-primary", textClassName)}>
          Repost Ai
        </span>
      )}
    </>
  );
}
