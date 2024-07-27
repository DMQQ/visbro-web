"use client";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import SocialMedia from "../SocialMedia/SocialMedia";

export default function AppFooter() {
  const t = useTranslations("Navigation");

  return (
    <footer className="w-full dark:bg-zinc-900 flex flex-col">
      <hr className="border-zinc-800" />

      <section className="p-5 mb-5 text-zinc-400">
        <nav className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5 md:w-3/4 m-auto mt-5 rtl:text-lg">
          <div className="flex flex-col gap-5">
            <Link href={`/about-us`}>{t("about")}</Link>

            <Link href="/collaboration">{t("collab")}</Link>

            <Link href="/job-offers">{t("offers")}</Link>

            <Link href={"/Datenschutzerklärung.pdf"}>Datenschutzerklarung</Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link href="/biuroservis">{t("biuroservis")}</Link>

            <Link href="/biuroservis/housing">{t("services.housing")}</Link>
            <Link href="/biuroservis/cleaning-services">
              {t("services.cleaning-services")}
            </Link>

            <Link href="/biuroservis/recrutation">
              {t("services.recruitment")}
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link href="/career">{t("career")}</Link>

            <Link href="/gallery">{t("gallery")}</Link>

            <Link href="/contact">{t("contact")}</Link>
          </div>
        </nav>
      </section>

      <hr className="border-zinc-800" />

      <section className="p-5 flex justify-center items-center">
        <SocialMedia classes="!gap-5" />
      </section>

      <hr className="border-zinc-800" />

      <section className="p-5 text-zinc-600 gap-5 flex justify-between flex-col sm:flex-row">
        <div>
          SVG Background by{" "}
          <a target="_blank" href="https://bgjar.com">
            BGJar
          </a>
        </div>

        <Link href={"/impressum"} className="underline text-zinc-200">
          Impressum
        </Link>

        <div>
          <a href="https://dmqq.pl" target="_blank" rel="nofollow">
            2024 By DMQ
          </a>{" "}
          & <a href="https://github.com/mokk4s">MOKK4S</a>
        </div>
      </section>
    </footer>
  );
}
