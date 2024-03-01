import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Recruitment" });

  return {
    title: t("heading"),
    description: t("content"),
  };
}

export default function Recrutation({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Recruitment");
  return (
    <article className="mt-5 border-t border-t-zinc-700 flex flex-col lg:flex-row gap-5">
      <div className="flex-1 flex flex-col">
        <h1 className="text-5xl font-bold py-5">{t("heading")}</h1>
        <p className="text-zinc-300 mb-5 flex-1 text-lg rtl:text-xl">
          {t.rich("content", {
            br: () => <br />,
          })}
        </p>
        <div className="w-full flex">
          <a
            href="tel:+49 1520 8941615"
            className=" bg-blue-900 rounded-md px-4 py-4 text-center w-full "
          >
            {t("button")}
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-5 mt-5 flex-1">
        {["/gallery/6.jpg", "/gallery/7.jpg", "/gallery/8.jpg", "/4.png"].map(
          (src) => (
            <Image
              priority
              key={src}
              alt="Bh"
              width={300}
              height={200}
              src={src}
              className="object-cover w-full h-full 2xl:max-h-[19rem]"
            />
          )
        )}
      </div>
    </article>
  );
}
