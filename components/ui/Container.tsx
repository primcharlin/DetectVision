import clsx from "clsx";
import type { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)} {...props} />;
}
