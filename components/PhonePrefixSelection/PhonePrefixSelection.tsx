"use client";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { locales } from "@/locales";
import clsx from "clsx";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import { usePathname } from "next/navigation";

function getFlagEmoji(countryCode: any) {
  return "/flags/" + countryCode + ".png";
}

const prefixes = {
  en: "+44", // United Kingdom
  de: "+49", // Germany
  ro: "+40", // Romania
  ru: "+7", // Russia
  pl: "+48", // Poland
  tr: "+90", // Turkey
  ar: "+971", // United Arab Emirates
  ua: "+380", // Ukraine
};

interface PhonePrefixSelectionProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  key: string;
  id: string;
  error: string;
  label: string;
  onSave: (s: string) => void;

  savedValue: string;
}

export default function PhonePrefixSelection(props: PhonePrefixSelectionProps) {
  const [open, setIsOpen] = useState(false);
  const pathname = usePathname();
  const _locale = (pathname.split("/")[1] || "pl") as keyof typeof prefixes;

  const [locale, setLocale] = useState<keyof typeof prefixes>(_locale);
  const [value, setValue] = useState(props.savedValue || "");

  return (
    <div className="relative p-2">
      <label
        htmlFor={props.id}
        className={clsx("block mb-2 text-sm font-medium  dark:text-white", {
          "!text-red-600": !!props.error,
        })}
      >
        {props.label}
      </label>

      <div
        className={clsx("flex border border-zinc-600 rounded-md ", {
          "!border-red-600": !!props.error,
        })}
      >
        <button
          onClick={() => setIsOpen((p) => !p)}
          data-dropdown-toggle="dropdown"
          className="bg-zinc-900 border-r hover:bg-zinc-800 justify-center items-center border-zinc-600 rounded-l-md py-4 px-2 flex"
          type="button"
        >
          <span className="text-xs mx-2">{prefixes[locale]}</span>
          <img
            src={"/flags/" + locale + ".png"}
            alt=""
            className="w-4 text-xs mr-2"
          />
        </button>
        <input
          placeholder="000 000 000"
          className={clsx(
            "bg-gray-50 outline-none text-sm ring-1 ring-zinc-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700",
            {
              "!text-red-600 !ring-red-600": !!props.error,
            }
          )}
          type="tel"
          onBlur={(e) => props?.onBlur?.(e as any)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => props.onSave(prefixes[locale] + value)}
          className="p-2 border-l border-zinc-600"
        >
          <IoMdCheckmark className="text-white" />
        </button>
      </div>

      {!!props.error && <p className="text-red-500 text-xs">{props.error}</p>}

      {open && (
        <ul className="absolute bg-zinc-900 rounded-md mt-2 p-2 border border-zinc-600">
          {locales.map((locale) => (
            <li key={locale} className="mb-4">
              <button
                onClick={() => {
                  setLocale(locale as any);
                  setIsOpen(false);
                }}
                className="flex text-xs items-center justify-between gap-2"
              >
                <span>{prefixes[locale as keyof typeof prefixes]}</span>
                <Image
                  src={"/flags/" + locale + ".png"}
                  width={10}
                  height={5}
                  className="w-auto h-auto"
                  alt={locale}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
