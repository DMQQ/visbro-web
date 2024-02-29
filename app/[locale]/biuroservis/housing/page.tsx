import { Link } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Housing({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">Kwatery pracownicze</h1>
      <p className="text-zinc-300 mb-5">
        Zapraszamy do skorzystania z naszych kwater pracowniczych, które są
        idealnym rozwiązaniem dla członków Twojego zespołu. Nasze mieszkania w
        Niemczech Wschodnich są nie tylko w pełni wyposażone, ale także
        zaprojektowane z ogromną starannością. Regularne sprzątanie gwarantuje
        utrzymanie czystości i komfortu dla wszystkich mieszkańców. Niezależnie
        od lokalizacji Twojej działalności w Niemczech, z nami możesz być
        pewien, że zapewnimy Ci natychmiastowe wsparcie w zakresie
        zakwaterowania. Dzięki współpracy z naszymi partnerami biznesowymi mamy
        możliwość organizacji mieszkań na terenie całego kraju, zapewniając
        elastyczność i wygodę Twojemu zespołowi. Jeśli chcesz zobaczyć, jak
        prezentują się nasze mieszkania, zapraszamy do obejrzenia galerii zdjęć
        dostępnej na naszej stronie internetowej. Wybierz nasze kwatery
        pracownicze i zapewnij swojemu zespołowi idealne warunki do pracy i
        relaksu!
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
            pathname: "/biuroservis/housing",
            query: {
              modal: "true",
              service: "find location",
              type: "housing",
            },
          }}
        >
          Napisz do nas
        </Link>
      </div> */}
    </article>
  );
}
