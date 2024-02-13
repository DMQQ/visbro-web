"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import clsx from "clsx";

const links = [
  { path: "/about-us", text: "about" },
  { path: "/collaboration", text: "collab" },
  {
    path: "/job-offers",
    text: "offers",
  },
  {
    path: "/biuroservis",
    text: "biuroservis",
  },
  {
    path: "/gallery",
    text: "gallery",
  },
  {
    path: "/contact",
    text: "contact",
  },
  { path: "/career", text: "career" },
  {
    path: "/visbro-car-rental",
    text: "rental",
  },
] as const;

const NavigationList = (props: { dismiss: () => void }) => {
  const t = useTranslations("Navigation");

  const pathname = usePathname();

  return (
    <nav
      style={{ zIndex: 100 }}
      className={`flex fixed top-0 left-0 w-full h-screen justify-center items-center bg-zinc-900`}
    >
      <ul className="h-3/4 w-full flex flex-col">
        {links.map((link) => (
          <li
            key={link.path}
            className={`p-5 font-bold text-2xl ${
              pathname.startsWith(link.path)
                ? "border-l-4 border-l-blue-400 bg-blue-200 bg-opacity-10"
                : ""
            }`}
          >
            <Link
              href={link.path}
              className={
                pathname.startsWith(link.path) ? "text-blue-400" : "text-white"
              }
              onClick={() => props.dismiss()}
            >
              {t(link.text)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function AppHeader() {
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);

  const t = useTranslations("Navigation");

  const onToggleModal = () => {
    isOpenNavigation
      ? setIsOpenNavigation(false)
      : setIsOpenNavigation((prev) => !prev);
  };

  const pathname = usePathname();

  return (
    <>
      <header
        style={{ zIndex: 101 }}
        className="fixed top-0 dark:bg-zinc-900 w-full p-5 md:pl-5 md:pr-3 md:p-7 flex justify-between items-center shadow-lg"
      >
        <Link
          href="/"
          onClick={() => setIsOpenNavigation(false)}
          className="font-bold text-2xl flex items-center mr-2"
        >
          <Image
            alt="logo"
            src={"/logo_placeholder.ico"}
            width={30}
            height={30}
            style={{ marginRight: 5 }}
          />
          Visbro
        </Link>

        <nav className="flex justify-end w-11/12 xl:w-3/4">
          <ul
            className={`hidden lg:flex flex-row justify-around flex-1 items-center`}
          >
            {links.map((link) => (
              <li
                key={link.path}
                className={
                  pathname.startsWith(link.path)
                    ? "border-b-2 border-b-blue-400"
                    : ""
                }
              >
                <Link
                  href={link.path}
                  className={clsx("text-white", {
                    "!text-blue-400": pathname.startsWith(link.path),
                  })}
                >
                  {t(link.text)}
                </Link>
              </li>
            ))}
          </ul>

          <ChangeLanguage />

          <button onClick={onToggleModal} className="lg:hidden ml-5">
            {isOpenNavigation ? (
              <RxCross1 color="#fff" size={25} />
            ) : (
              <RxHamburgerMenu color="#fff" size={25} />
            )}
          </button>
        </nav>
      </header>

      {isOpenNavigation && (
        <NavigationList dismiss={() => setIsOpenNavigation(false)} />
      )}
    </>
  );
}
