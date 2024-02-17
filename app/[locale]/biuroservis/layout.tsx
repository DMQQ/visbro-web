import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import Modal from "./Modal";
import Navigation from "./Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const t = useTranslations("Biuroservis");
  return (
    <>
      <PageWrapper>
        <article className="p-5 rounded-md w-full md:w-3/4 xl:w-2/3 m-auto">
          <div className="mb-5">
            <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
              {t("heading")}
            </h1>
            <p className="text-zinc-300 mt-2">{t("heading_helper")}</p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <Navigation />
            {children}
          </div>
        </article>
      </PageWrapper>

      <Modal />
    </>
  );
}
