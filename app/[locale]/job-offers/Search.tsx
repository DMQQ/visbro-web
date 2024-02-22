"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Search() {
  const [text, setText] = useState("");
  const t = useTranslations("JobOffers");
  return (
    <header className="my-10">
      <h2 className="text-md font-medium py-2">{t("search.label")}</h2>
      <div className="flex flex-row gap-2">
        <input
          placeholder={t("search.placeholder")}
          value={text}
          onChange={({ target }) => setText(target.value)}
          className="dark:bg-zinc-800 border-2 border-zinc-700 rounded-md w-full p-2 outline-none focus:border-blue-600"
        />
        <button className=" px-5 py-3 rounded-md bg-blue-900 transition-colors hover:bg-blue-950 active:bg-blue-800">
          {t("search.button")}
        </button>
      </div>
      {/* <div className="flex flex-row gap-2 py-5 overflow-x-scroll sm:overflow-hidden">
        {["Frankfurt", "Lipsk", "Berlin", "Monachium", "More"].map((filter) => (
          <button
            key={filter}
            className="dark:bg-zinc-950 px-5 py-2 rounded-md"
          >
            {filter}
          </button>
        ))}
      </div> */}
    </header>
  );
}
