import { Link } from "@/navigation";

export function generateMetadata() {
  return {
    title: "Page not found (404) - Visbro Personal Solution UG",
    description: "Oops! Page not found. Please check the URL.",
  };
}

export default function Error404() {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-zinc-950">
      <div>
        <h1 className="text-white text-4xl font-bold text-center">
          Page not found (404)
        </h1>
        <div className="mt-2 flex justify-center">
          <Link href={"/"} className="text-center underline">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
