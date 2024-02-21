import { Link } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default function CleaningServices({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">Usługi sprzątające</h1>
      <p className="text-zinc-300">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam non,
        labore voluptatum voluptas voluptates debitis et, veniam ipsam hic sunt
        quia perspiciatis libero recusandae consequatur dolores? Maxime
        laudantium accusantium quas! Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Totam non, labore voluptatum voluptas voluptates
        debitis et, veniam ipsam hic sunt quia perspiciatis libero recusandae
        consequatur dolores? Maxime laudantium accusantium quas!
      </p>
      <div className="mt-5 bg-blue-900 rounded-md px-4 py-3 text-center w-full md:max-w-40">
        <Link
          href={{
            pathname: "/biuroservis/cleaning-services",
            query: {
              modal: "true",
              service: "cleaning-services",
              type: "cleaning-services",
            },
          }}
        >
          Napisz do nas
        </Link>
      </div>
    </article>
  );
}
