import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite scrolling carousel. Content is duplicated so the loop is seamless.
 * Motion pauses whenever the cursor rests on the track (or on keyboard focus).
 */
export function Marquee({
  children,
  direction = "left",
  speed = 45,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={cn("marquee-mask group relative overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={cn(
          "flex w-max gap-4 pr-4",
          direction === "left" ? "marquee-left" : "marquee-right",
          paused && "marquee-paused",
        )}
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 gap-4 pr-4">{children}</div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
