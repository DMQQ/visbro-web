"use client";

import { Link, usePathname } from "@/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const subRoutes = [
  { route: "/", text: "biuroservice" },
  { route: "/recrutation", text: "recruitment" },
  { route: "/housing", text: "housing" },
  { route: "/cleaning-services", text: "cleaning-services" },
  { route: "/truck-rental", text: "car-rental" },
];

export default function Navigation() {
  const pathname = usePathname();

  const t = useTranslations("Navigation.services");

  return (
    <nav className="flex justify-center w-full rounded-md">
      <ul className="w-full flex flex-col md:flex-row justify-between">
        {subRoutes.map((link) => {
          const isActive =
            link.route === "/"
              ? pathname.endsWith("biuroservis")
              : pathname.includes(link.route);
          return (
            <li
              key={link.route}
              className={clsx("p-2 uppercase text-sm", {
                "border-b-2 border-b-blue-400": isActive,
              })}
            >
              <Link
                href={"/biuroservis" + link.route}
                className={clsx("text-white text-md", {
                  "!text-blue-400": isActive,
                })}
              >
                {t(link.text)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
