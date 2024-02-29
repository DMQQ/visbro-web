import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Recrutation({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Recruitment");
  return (
    <article className="mt-5 border-t border-t-zinc-700">
      <h1 className="text-3xl font-bold py-5">{t("heading")}</h1>
      <p className="text-zinc-300 mb-5">
        {t.rich("content", {
          br: () => <br />,
        })}
      </p>
      <div className="my-5">
        <a
          href="tel:+49 1520 8941615"
          className=" bg-blue-900 rounded-md px-4 py-3 text-center w-full md:max-w-40"
        >
          {t("button")}
        </a>
      </div>
    </article>
  );
}
