"use client";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function AppFooter() {
  const t = useTranslations("Navigation");
  // const t2 = useTranslations("Footer");

  return (
    <footer className="w-full dark:bg-zinc-900 flex flex-col">
      {/* <section className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5 md:w-3/4 m-auto mt-5 hidden">
        <section className="w-full dark:bg-zinc-900 rounded-md p-5">
          <h3 className="font-bold text-2xl">{t2("contact.heading")}</h3>
          <hr className="border-zinc-800 my-2" />

          <p className="p-2 text-zinc-400">
            {t2("contact.phone_number_office")}: <br />
            <span className="text-white">+48 000 000 000</span>
          </p>
          <p className="p-2 text-zinc-400">
            {t2("contact.phone_number_owner")}: <br />
            <span className="text-white">+48 000 000 000</span>
          </p>
          <p className="p-2 text-zinc-400">
            {t2("contact.email")}: <br />
            <a href="mailto:placeholder@gmail.com" className=" text-white">
              placeholder@gmail.com
            </a>
          </p>

          <p className="p-2 text-zinc-400">
            FAX: <br /> <span className="text-white">+1 000 000 0000</span>
          </p>
        </section>
        <section className="w-full dark:bg-zinc-900 rounded-md p-5">
          <h3 className="font-bold text-2xl">{t2("address.heading")}</h3>
          <hr className="border-zinc-800 my-2" />

          <p className="p-2 text-zinc-400">
            {t2("address.headquater_location")}: <br />{" "}
            <span className="text-white">
              Nieznana lokalizacja 23/5a Olsztyn Polska
            </span>
          </p>

          <p className="p-2 text-zinc-400">
            {t2("address.other_location")}: <br />
            <span className="text-white">
              Test lokalizja 23/5a Olsztyn Polska
            </span>
          </p>

          <p className="p-2 text-zinc-400">
            {t2("address.open_hours")}: <br />
            <span className="text-white">8:00-14:00 (pon-pt)</span>
          </p>
          <p className="p-2 text-zinc-400">
            {t2("address.open_hours")}: <br />
            <span className="text-white">10:00-11:30 (sob-ndz)</span>
          </p>
        </section>

        <section className="w-full dark:bg-zinc-900 rounded-md p-5">
          <h3 className="font-bold text-2xl">{t2("about.heading")}</h3>
          <hr className="border-zinc-800 my-2" />

          <p className="p-2 text-zinc-400">
            {t2("about.tax_number")}: <br />
            <span className="text-white">00000 0204020 0402042042</span>
          </p>
          <p className="p-2 text-zinc-400">
            {t2("about.data_admin")}: <br />
            <span className="text-white">xxxxx xxxx</span>
          </p>
          <p className="p-2 text-zinc-400">
            {t2("about.website_owner")}: <br />{" "}
            <span className="text-white">xxxxx xxxx</span>
          </p>
          <p className="p-2 text-zinc-400">
            {t2("about.company_name")}: <br />{" "}
            <span className="text-white">xxxxx xxxx</span>
          </p>
        </section>
      </section> */}

      <hr className="border-zinc-800" />

      <section className="p-5 mb-5 text-zinc-400">
        <nav className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5 md:w-3/4 m-auto mt-5 rtl:text-lg">
          <div className="flex flex-col gap-5">
            <Link href={`/about-us`}>{t("about")}</Link>

            <Link href="/collaboration">{t("collab")}</Link>

            <Link href="/job-offers">{t("offers")}</Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link href="/biuroservis">{t("biuroservis")}</Link>

            <Link href="/gallery">{t("gallery")}</Link>

            <Link href="/contact">{t("contact")}</Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link href="/career" className="md:px-2">
              {t("career")}
            </Link>

            <Link href="/biuroservis/visbro-car-rental" className="md:px-2">
              {t("rental")}
            </Link>
          </div>
        </nav>
      </section>

      <hr className="border-zinc-800" />

      <hr className="border-zinc-800" />

      <section className="p-5 text-zinc-600 gap-5 flex justify-between flex-col sm:flex-row">
        <div>
          Free SVG Background by{" "}
          <a target="_blank" href="https://bgjar.com">
            BGJar
          </a>
        </div>

        <Link href={"/impressum"} className="underline text-zinc-200">
          Impressum
        </Link>

        <div>
          <a href="https://github.com/DMQQ" target="_blank" rel="nofollow">
            2024 By DMQ
          </a>
          &<a href="https://github.com/mokk4s">MOKK4S</a>
        </div>
      </section>
    </footer>
  );
}
