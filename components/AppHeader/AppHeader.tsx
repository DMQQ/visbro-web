"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/navigation";
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import clsx from "clsx";
import Image from "next/image";
import { links } from "./links";
import SocialMedia from "../SocialMedia/SocialMedia";

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
            width={200}
            height={100}
            alt="logo"
            src={"/logo.png"}
            className="w-36 h-10 object-cover"
          />
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
                    "text-white text-sm xl:!text-md uppercase hover:text-blue-300 rtl:text-lg",
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
            className="lg:hidden ms-5"
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
