"use client";
import { locales } from "@/locales";
import { Link } from "@/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function getFlagEmoji(countryCode: any) {
  return "/flags/" + countryCode + ".png";
}

const localesWithFlags = locales.map((locale) => [
  locale,
  getFlagEmoji(locale),
]);

export default function ChangeLanguage() {
  const [open, setIsOpen] = useState(false);

  const path = usePathname();

  const locale = path.split("/")[1] || "en";

  return (
    <div className="relative">
      <button
        role="menu"
        onClick={() => setIsOpen((p) => !p)}
        aria-label="language change button"
        className="bg-zinc-950 p-2 rounded-md flex"
        type="button"
      >
        <img
          src={"/flags/" + locale + ".png"}
          alt=""
          className="w-4 mr-2 text-xs"
        />
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div
          aria-label="menu-list"
          className="absolute right-12 translate-x-10 top-10 rounded-lg bg-zinc-950"
        >
          <ul className=" text-zinc-300 w-12 overflow-hidden">
            {localesWithFlags.map(([locale, flag]) => (
              <li key={locale} className="p-2">
                <Link href={"/"} locale={locale} className="flex items-center">
                  <img
                    src={flag}
                    alt={locale + " flag"}
                    className="w-10 rounded-md"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
