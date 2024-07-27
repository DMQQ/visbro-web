"use client";
import Button from "@/components/ui/Button/Button";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ApplicationPanel(props: { offerId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const t = useTranslations("ApplicationForm");

  return (
    <section className="flex-1 p-2 dark:bg-zinc-900 min-w-72 border-l border-l-zinc-800">
      <div className="p-4">
        <h2 className="font-bold text-xl">{t("heading")}</h2>

        <Button
          text={t("buttons.openForm")}
          className="w-full mt-5 py-3  bg-blue-900 transition-colors hover:bg-blue-950 active:bg-blue-800 text-blue-100"
          onClick={() =>
            router.replace({
              pathname: pathname,
              params: params,
              query: { modal: true },
            })
          }
        />
      </div>
    </section>
  );
}
