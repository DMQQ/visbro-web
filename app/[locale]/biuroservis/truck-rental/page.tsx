import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";

import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import { cars } from "./cars";
import CarTile from "./CarTile";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Rental" });

  return {
    title: t("header_title"),
    description: `Odkryj, jak Visbro może stać się kluczowym elementem Twojego biznesowego
    sukcesu! Jesteśmy gotowi sprostać wszystkim Twoim potrzebom związanym z
    flotą aut dostawczych oraz ciężarowych, a nasze wsparcie pomoże Ci
    zredukować koszty i zoptymalizować działanie Twojej firmy.
    Specjalizujemy się w wynajmie długoterminowym, co oznacza, że nie tylko
    dostarczamy pojazdy, ale również budujemy trwałe relacje partnerskie.
    Dzięki naszemu doświadczeniu i zaangażowaniu jesteśmy idealnym partnerem
    biznesowym, który zapewni Ci nie tylko flotę pojazdów, ale także pełne
    wsparcie i profesjonalną obsługę.`,
  };
}

export default function CarRental({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Rental");

  return (
    <PageWrapper style="!mt-5 border-t border-t-zinc-700 !p-0">
      <div className="mb-5 mt-5 p-2">
        <h1 className="text-white text-3xl font-bold ">{t("header_title")}</h1>
        <p className="text-zinc-400">{t("header_helper")}</p>
      </div>

      <p className="text-zinc-200 mb-5 p-2">
        Odkryj, jak Visbro może stać się kluczowym elementem Twojego biznesowego
        sukcesu! Jesteśmy gotowi sprostać wszystkim Twoim potrzebom związanym z
        flotą aut dostawczych oraz ciężarowych, a nasze wsparcie pomoże Ci
        zredukować koszty i zoptymalizować działanie Twojej firmy.
        Specjalizujemy się w wynajmie długoterminowym, co oznacza, że nie tylko
        dostarczamy pojazdy, ale również budujemy trwałe relacje partnerskie.
        Dzięki naszemu doświadczeniu i zaangażowaniu jesteśmy idealnym partnerem
        biznesowym, który zapewni Ci nie tylko flotę pojazdów, ale także pełne
        wsparcie i profesjonalną obsługę.
      </p>

      <article className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
        {cars.map((car) => (
          <CarTile key={car.name} car={car} />
        ))}
      </article>
    </PageWrapper>
  );
}
