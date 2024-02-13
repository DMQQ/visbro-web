"use client";
import Button from "@/components/ui/Button/Button";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import ApplicationModal from "../../../components/ApplicationModal/ApplicationModal";
import { usePathname, useRouter } from "@/navigation";

export default function Biuroservis({ searchParams }: any) {
  const t = useTranslations("Biuroservis");

  const router = useRouter();
  const pathname = usePathname();

  return (
    <PageWrapper>
      <article className="p-5 rounded-md w-full md:w-4/5 lg:w-2/3 m-auto">
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
          <p className="text-zinc-300 mt-2">{t("heading_helper")}</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 ">
          {["Sprzątanie", "Zakwaterowanie", "Wypożyczalnia"].map((key) => (
            <section
              key={key}
              className="p-2 bg-zinc-900 rounded-md min-h-80 flex flex-col justify-center items-center"
            >
              <h2 className="font-bold text-2xl lg:text-4xl text-center">
                {key}
              </h2>
              <p className="w-2/3 text-zinc-300 mt-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis quia deleniti assumenda, animi,
              </p>
              <Button
                text="Wypełnij formularz"
                className="mt-2"
                onClick={() => router.push(pathname + "?modal=true")}
              />
            </section>
          ))}
        </section>
      </article>

      {searchParams.modal === "true" && <ApplicationModal />}
    </PageWrapper>
  );
}
