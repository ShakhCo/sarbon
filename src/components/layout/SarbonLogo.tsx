import Image from "next/image";

/** Official Sarbon lockup (mark + wordmark). Source: /public/srb.png (229×60). */
export function SarbonLogo({
  className = "",
  height = 30,
  priority = false,
}: {
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const width = Math.round((height * 229) / 60);
  return (
    <Image
      src="/srb.png"
      alt="Sarbon"
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto select-none ${className}`}
      style={{ height, width }}
    />
  );
}
