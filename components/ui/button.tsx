import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition-all duration-200",
        "bg-black text-white hover:bg-slate-800:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm",
        className
      )}
    />
  );
}
