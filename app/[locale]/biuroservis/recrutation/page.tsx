import { unstable_setRequestLocale } from "next-intl/server";

export default function Recrutation({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">Rekrutacja</h1>
      <p className="text-zinc-300 mb-5">
        Zajmujemy się rekrutacją pracowników do różnorodnych sektorów, zarówno
        na stanowiska tymczasowe, jak i stałe. Naszym priorytetem jest
        zapewnienie Ci optymalnej liczby kwalifikowanych pracowników, dokładnie
        wtedy, gdy ich potrzebujesz, gwarantując przy tym płynność procesu bez
        niepotrzebnych przeszkód. Oferujemy Ci nasze wszechstronne wsparcie i
        jesteśmy zawsze do Twojej dyspozycji – pomożemy Ci rozwijać Twój biznes
        i sprawimy, że dotychczasowe wyzwania związane z personelem odejdą w
        niepamięć. <br /> <br /> W naszej ofercie znajdziesz również programy
        szkoleniowe, dzięki którym nowi pracownicy szybko zaaklimatyzują się w
        Twojej firmie, co znacząco przyspieszy ich efektywność i integrację z
        zespołem. Zapraszamy do kontaktu, aby dowiedzieć się więcej o tym, jak
        możemy wspólnie przyczynić się do sukcesu Twojego przedsiębiorstwa. Z
        nami, Twój rozwój jest w dobrych rękach.
      </p>
      <a
        href="tel:+49 1520 8941615"
        className="my-5 bg-blue-900 rounded-md px-4 py-3 text-center w-full md:max-w-40"
      >
        Zadzwoń do nas!
      </a>
    </article>
  );
}
