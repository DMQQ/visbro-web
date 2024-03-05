import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";

export const metadata = {
  title: "Impressum - Visbro",
};

export default function Impressum() {
  return (
    <PageWrapper>
      <article className="p-5 rounded-md w-full md:w-4/5 lg:w-2/3 m-auto">
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            Impressum
          </h1>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 text-xl gap-5 bg-zinc-950">
          <div>
            <p className="p-2">Visbro Personal Solutions UG</p>
            <p className="p-2">Franz Flemming Straße 43a</p>
            <p className="p-2">04179 Leipzig</p>
          </div>
          <div>
            <p className="p-2">Tel: +4915208941615</p>
            <p className="p-2">E-Mail: info@visbro.de</p>
          </div>
          <div>
            <p className="p-2">
              Vertreten durch den Geschäftsführer: Kamil Wojciech Czarnecki
            </p>
            <p className="p-2">Registernummer der UG: HRB 42456</p>
            <p className="p-2">USt-IDNr: in Arbeit</p>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
