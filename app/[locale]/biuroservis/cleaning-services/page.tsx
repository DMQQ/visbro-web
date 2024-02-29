import { Link } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default function CleaningServices({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">Usługi sprzątające</h1>
      <p className="text-zinc-300 mb-5">
        Visbro oferuje również profesjonalne usługi sprzątające w sektorze
        prywatnym oraz firmowym . Nasz doświadczony personel który dysponuje
        wszystkimi niezbędnymi narzędziami jest w stanie sprostać wszystkim
        wymaganiom . Naszym priorytetem jest zapewnie ci najwyższej jakości
        wykonywanych usług spersonalizowanych specjalnie dla ciebie lub twojej
        firmy.
      </p>

      <a
        href="tel:+49 1520 8941615"
        className="my-5 bg-blue-900 rounded-md px-4 py-3 text-center w-full md:max-w-40"
      >
        Zadzwoń do nas!
      </a>

      {/* <div className="mt-5 bg-blue-900 rounded-md px-4 py-3 text-center w-full md:max-w-40">
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
      </div> */}
    </article>
  );
}
