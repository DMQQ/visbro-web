"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { links } from "./links";
import { Link } from "@/navigation";
import clsx from "clsx";
import SocialMedia from "../SocialMedia/SocialMedia";

const NavigationList = (props: { dismiss: () => void }) => {
  const t = useTranslations("Navigation");

  const pathname = usePathname();

  return (
    <nav
      style={{ zIndex: 100 }}
      className={`flex fixed top-0 left-0 w-full h-screen justify-center items-center bg-zinc-900`}
    >
      <ul className="h-3/4 w-full flex flex-col">
        <div className="flex-1">
          {links.map((link) => (
            <li
              key={link.path}
              className={`p-5 font-bold text-2xl ${
                pathname.startsWith(link.path)
                  ? "border-l-4 border-l-blue-400 bg-blue-300 bg-opacity-10"
                  : ""
              }`}
            >
              <Link
                href={link.path}
                className={clsx("text-white ", {
                  "!text-blue-400": pathname.startsWith(link.path),
                })}
                onClick={() => props.dismiss()}
              >
                {t(link.text)}
              </Link>
            </li>
          ))}
        </div>
        <div className="p-5">
          <SocialMedia />
        </div>
      </ul>
    </nav>
  );
};

export default NavigationList;
