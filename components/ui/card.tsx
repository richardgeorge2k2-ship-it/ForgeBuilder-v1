import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-2xl border bg-white p-4 shadow-sm",
        className
      )}
    />
  );
}
