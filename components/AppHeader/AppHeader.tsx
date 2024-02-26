"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import clsx from "clsx";
import Image from "next/image";
import { links } from "./links";
import NavigationList from "./MobileNav";

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
            priority
            width={30}
            height={20}
            alt="logo"
            src={"/logo_placeholder.ico"}
            className="w-7 mr-2"
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
                  className={clsx(
                    "text-white text-sm xl:!text-md uppercase hover:text-blue-300",
                    {
                      "!text-blue-400": pathname.startsWith(link.path),
                    }
                  )}
                >
                  {t(link.text)}
                </Link>
              </li>
            ))}
          </ul>

          <ChangeLanguage />

          <button
            onClick={onToggleModal}
            className="lg:hidden ml-5"
            aria-label={
              isOpenNavigation ? "Close Navigation" : "Open Navigation"
            }
            aria-expanded={isOpenNavigation}
          >
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
