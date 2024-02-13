import { ReactNode } from "react";

export default function PageWrapper({
  children,
  style = "",
}: {
  children: ReactNode;
  style?: string;
}) {
  return (
    <main className={"w-full min-h-screen mt-20 " + style}>{children}</main>
  );
}
