import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Biuroservis({ searchParams, params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Biuroservis");

  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">Sprawdź nasze inne usługi</h1>
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
