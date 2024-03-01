import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Services({ params: { locale } }: any) {
  const t = useTranslations("Biuroservis");

  const content = t("services")
    .split("\n")
    .map((s) => s.split(":"));

  return (
    <article className=" mt-5 border-t border-t-zinc-700 ">
      <section className="flex flex-col w-full gap-5 mt-5">
        {content.map(([heading, content], index) => (
          <Tile content={content} heading={heading} key={index} />
        ))}
      </section>
    </article>
  );
}

const Tile = (props: { heading: string; content: string }) => {
  return (
    <details className="p-5 rounded-md bg-zinc-950 flex flex-col items-start hover:bg-zinc-800 transition duration-200">
      <summary className="cursor-pointer">
        {props.heading.split(".")[1]}
      </summary>

      <p className="mt-5 text-left flex-1 mb-5 text-zinc-300">
        {props.content}
      </p>

      <Link
        href={{
          pathname: "/biuroservis",
          query: {
            modal: "true",
            service: props.heading.split(".")[1],
            type: "services",
          },
        }}
        className="bg-blue-800 w-full px-5 text-center py-3 rounded-md sm:w-52"
      >
        Apply
      </Link>
    </details>
  );
};
