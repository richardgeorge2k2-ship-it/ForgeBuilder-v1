import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50",
        className
      )}
    />
  );
}
