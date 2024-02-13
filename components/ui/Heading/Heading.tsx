import { ReactNode } from "react";

export default function Heading(props: { children: ReactNode }) {
  return (
    <h2 className="text-white text-2xl lg:text-6xl font-bold p-5 text-center">
      {props.children}
    </h2>
  );
}
