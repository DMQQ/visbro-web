import { locales } from "@/locales";
import { Link } from "@/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

function getFlagEmoji(countryCode: any) {
  return "/flags/" + countryCode + ".png";
}

const localesWithFlags = locales.map((locale) => [
  locale,
  getFlagEmoji(locale),
]);

export default function ChangeLanguage() {
  const path = usePathname();

  const locale = path.split("/")[1] || "ro";

  return (
    <div
      className="relative group"
      aria-label="language-menu"
      id="language-menu"
    >
      <button
        role="link"
        className="bg-zinc-950 hover:bg-zinc-900 p-2 rounded-md flex"
        type="button"
        aria-controls="language-menu"
      >
        <Image
          width={16}
          height={10}
          priority
          src={"/flags/" + locale + ".png"}
          alt={"Selected language " + locale}
          className="w-4 mr-2 text-xs"
          aria-roledescription="Currently selected language on page"
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

      <div
        aria-label="menu-list"
        className="absolute hidden group-hover:block right-12 translate-x-10 top-5 rounded-lg bg-zinc-950"
      >
        <ul className=" text-zinc-300 w-12 overflow-hidden">
          {localesWithFlags.map(([locale, flag]) => (
            <li key={locale} className="p-2">
              <Link
                hrefLang={locale}
                href={"/"}
                locale={locale}
                className="flex items-center"
              >
                <Image
                  width={30}
                  height={20}
                  src={flag}
                  alt={locale + " flag"}
                  className="w-9 rounded-sm"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
