import { unstable_setRequestLocale } from "next-intl/server";

export default function Recrutation({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">Rekrutacja</h1>
      <p className="text-zinc-300">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam non,
        labore voluptatum voluptas voluptates debitis et, veniam ipsam hic sunt
        quia perspiciatis libero recusandae consequatur dolores? Maxime
        laudantium accusantium quas! Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Totam non, labore voluptatum voluptas voluptates
        debitis et, veniam ipsam hic sunt quia perspiciatis libero recusandae
        consequatur dolores? Maxime laudantium accusantium quas!
      </p>
    </article>
  );
}
