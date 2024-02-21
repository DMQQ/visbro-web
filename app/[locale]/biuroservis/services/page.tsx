import { Link } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

const content =
  `1. Pomoc w Uzyskaniu Kindergeld: Zapewniamy wsparcie w kompleksowym procesie aplikowania o Kindergeld, w tym wypełnianiu wniosków i zarządzaniu wymaganą dokumentacją.
2. Wsparcie w Procesie Ubiegania się o Arbaitlosegeld: Oferujemy kompleksową pomoc w przygotowaniu i składaniu wniosków o Arbaitlosegeld, w tym monitorowanie terminów i wymagań.
3. Asysta w Znalezieniu Mieszkania: Świadczymy usługi polegające na poszukiwaniu odpowiedniego mieszkania, organizowaniu wizyt oraz wsparciu w procesie wynajmu.
4. Ubezpieczenia zdrowotne oraz plany emerytalne: Zapewniamy doradztwo i pomoc w kwestiach związanych z niemieckim systemem ubezpieczeń zdrowotnych.
5. Usługi Ubezpieczeniowe: Oferujemy wsparcie w wyborze i zarządzaniu polisami ubezpieczeniowymi.
6. Doradztwo Kredytowe: Świadczymy usługi doradztwa w zakresie aplikacji o kredyt, w tym analizę ofert i pomoc w procesie aplikacyjnym.
7. Załatwianie Spraw Bankowych: Pomagamy w otwieraniu i zarządzaniu kontami bankowymi, dostosowując usługi do indywidualnych potrzeb klientów.
8. Wsparcie w Procesie Meldunku: Oferujemy pomoc w załatwieniu formalności związanych z meldunkiem, w tym umawianie spotkań i zarządzanie dokumentacją.
9. Rejestracja Samochodu: Zapewniamy kompleksową pomoc w procesie rejestracji pojazdów.
10. Pomoc w Uzyskaniu Wohngeld: Świadczymy usługi doradztwa i wsparcia w procesie aplikowania o Wohngeld.
11. Wsparcie w Uzyskaniu Bürgergeld: Pomagamy w procesie ubiegania się o Bürgergeld, zapewniając wsparcie na każdym etapie.
12. Wsparcie w wyborze usług komunikacyjnych: Oferujemy pomoc w uzyskaniu niemieckiego numeru telefonu, w tym wyborze odpowiedniej taryfy i operatora.
13. Pisanie Pism Urzędowych i Odwoławczych: Zapewniamy profesjonalne usługi pisania pism urzędowych, w tym skarg i odwołań.
14. Rozwiązywanie Problemów Cywilno-Prawnych: Oferujemy doradztwo i pomoc w rozwiązywaniu różnorodnych kwestii prawnych.
15. Pomoc oraz pełne doradzctwo w otwarciu firmy na terenie niemiec UG GmbH
16. Pomoc w otwarciu Gewerbe oraz kompleksowe prowadzenie dokumentacji związanych z prowadzeniem firmy w postaci samozatrudnienia .
17. Doradzctwo w prowadzeniu firmy na terenie Niemiec
18. Pomoc w rejestrowaniu dzieci do szkoły oraz przeczkola na terenie Niemiec`
    .split("\n")
    .map((service) => service.split(":"));

export default function Services({ searchParams, params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <article className="mt-5 border-t border-t-zinc-700">
        <h1 className="text-3xl font-bold py-5">Usługi</h1>
        <p className="text-zinc-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam non,
          labore voluptatum voluptas voluptates debitis et, veniam ipsam hic
          sunt quia perspiciatis libero recusandae consequatur dolores? Maxime
          laudantium accusantium quas! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Totam non, labore voluptatum voluptas voluptates
          debitis et, veniam ipsam hic sunt quia perspiciatis libero recusandae
          consequatur dolores? Maxime laudantium accusantium quas!
        </p>

        <section className="flex flex-col w-full gap-5 mt-5">
          {content.map(([heading, content], index) => (
            <Tile content={content} heading={heading} key={index} />
          ))}
        </section>
      </article>
    </>
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
          pathname: "/biuroservis/services",
          query: {
            modal: "true",
            service: props.heading.split(".")[1],
            type: "services",
          },
        }}
        className="bg-blue-800 w-full px-5 text-center py-3 rounded-md sm:w-52"
      >
        Aplikuj
      </Link>
    </details>
  );
};
