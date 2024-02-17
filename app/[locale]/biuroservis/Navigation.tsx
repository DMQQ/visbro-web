"use client";

import { Link, usePathname } from "@/navigation";
import clsx from "clsx";

const subRoutes = [
  { route: "/services", text: "Usługi" },
  { route: "/recrutation", text: "Rekrutacja" },
  { route: "/housing", text: "Kwatery pracownicze" },
  { route: "/cleaning-services", text: "Usługi sprzątające" },
  { route: "/truck-rental", text: "Wypożyczalnia samochodów" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center w-full rounded-md">
      <ul className="w-full flex flex-col md:flex-row justify-between">
        {subRoutes.map((link) => (
          <li
            key={link.route}
            className={clsx("p-2", {
              "border-b-2 border-b-blue-400": pathname.includes(link.route),
            })}
          >
            <Link
              href={"/biuroservis" + link.route}
              className={clsx("text-white text-md", {
                "!text-blue-400": pathname.includes(link.route),
              })}
            >
              <span>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
