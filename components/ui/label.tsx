import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { className = "", ...rest } = props;
  return (
    <label
      {...rest}
      className={"text-sm font-medium text-gray-900 " + className}
    />
  );
}
