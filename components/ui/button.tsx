import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium " +
        "bg-black text-white hover:bg-gray-900 active:bg-black transition disabled:opacity-50 " +
        className
      }
    />
  );
}
