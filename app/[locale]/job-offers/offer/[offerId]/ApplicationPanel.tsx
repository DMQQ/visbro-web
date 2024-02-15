"use client";
import Button from "@/components/ui/Button/Button";
import { usePathname, useRouter } from "@/navigation";

export default function ApplicationPanel() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="flex-1 p-2 dark:bg-zinc-900 min-w-72 border-l border-l-zinc-800">
      <div className="p-4">
        <h2 className="font-bold text-xl">Formularz aplikacyjny</h2>
        <p className="text-zinc-300 text-sm">Do oferty xxx-xxx-xxx</p>

        <Button
          text="Wypełnij formularz"
          className="w-full mt-2"
          onClick={() => router.push(pathname + "?modal=true")}
        />
      </div>
    </section>
  );
}
