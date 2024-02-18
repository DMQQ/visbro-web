import clsx from "clsx";

export default function MessageBox(props: {
  label: string;
  message: string;
  variant: "success" | "error" | "loading";
}) {
  return (
    <section className={clsx("p-5 border-l-2 border-l-zinc-700", {})}>
      <h3 className="font-bold text-white text-xl">{props.label}</h3>
      <p className="text-zinc-300">{props.message}</p>
    </section>
  );
}
