import { Link } from "@/navigation";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Error404() {
  unstable_setRequestLocale("en");
  return (
    <main className="w-full h-screen flex justify-center items-center bg-zinc-950">
      <div>
        <h1 className="text-white text-4xl font-bold">Page not found</h1>
        <Link href={"/"}>Home</Link>
      </div>
    </main>
  );
}
