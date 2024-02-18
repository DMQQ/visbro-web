import clsx from "clsx";
import Image from "next/image";

const list = [
  {
    image: "/home/people.jpg",
    heading: "Your Future starts at Visbro Personal Solution!",
    subheading:
      "Tailored Talent Solutions: Where Visbro Connects You with the Perfect Fit for Every Role!",
    content: ` Unlock Your Career Potential! 🚀 Join our elite team at Visbro
        Personal Solution, where opportunities meet talent. We specialize
        in connecting exceptional individuals with top-tier companies
        across industries. Whether you're a seasoned professional or a
        rising star, let us navigate your career journey. Elevate your
        success with personalized recruitment solutions, expert guidance,
        and a network that opens doors. Your dream job awaits – Apply now
        and let Visbro be your gateway to excellence! 🌟
        #CareerOpportunities #JoinUs #UnlockYourPotential`,
  },
  {
    image: "/home/cleaning.jpg",
    heading: "Elevate Your Space: Visbro - Transformative Cleaning Solutions!",
    subheading:
      "Spotless Excellence, Every Time: Visbro Ensures a Shine That Speaks Volumes.",
    content:
      "Discover the unparalleled cleanliness experience with [Cleaning Company Name]. Our dedicated team is committed to delivering transformative cleaning solutions tailored to your unique needs. From residential sanctuaries to commercial spaces, we guarantee spotless excellence, ensuring your environment reflects the pristine standards you deserve. Choose [Cleaning Company Name] for a sparkling clean that speaks volumes about your commitment to a fresh, inviting space. Elevate your surroundings with our meticulous cleaning services today!",
  },
  {
    image: "/home/legal.jpg",
    heading: "Visbro Your Trusted Ally in Legal Matters!",
    subheading:
      "Expert Counsel, Unmatched Advocacy: [Company Branch Legal Services] Ensures Your Legal Peace of Mind.",
    content: `Secure legal confidence with [Company Branch Legal Services]. Our seasoned team stands as your trusted ally, providing expert counsel and unmatched advocacy in all legal matters. Whether you're navigating corporate complexities or seeking personal legal support, we're here to guide you. [Company Branch Legal Services] is committed to ensuring your legal peace of mind, offering tailored solutions that align with your unique requirements. Partner with us for steadfast support and experience the assurance of having a dedicated legal team by your side. Your legal journey begins here!`,
  },
];

export default function Ad() {
  return (
    <article className="w-full p-5 mt-32 flex justify-center items-center">
      <section className="w-full xl:w-3/4 flex flex-col">
        <h3 className="m-auto text-4xl lg:text-6xl font-bold ">Nasza oferta</h3>

        {list.map((el, index) => (
          <div
            key={index}
            className={clsx(
              "div flex flex-col-reverse md:flex-row mt-16 bg-zinc-950 md:p-5 rounded-2xl",
              {
                "md:!flex-row-reverse": index % 2 === 0,
                "!mt-32": index !== 0,
              }
            )}
          >
            <Image
              width={600}
              height={390}
              src={el.image}
              alt={"Decorative image"}
              className="w-full md:w-1/2 object-cover max-h-96 rounded-md mt-5 md:mt-0"
            />
            <div
              className={clsx("flex-1", {
                "md:pr-5": index % 2 === 0,
                "md:pl-5": index % 2 === 1,
              })}
            >
              <h3
                // bg-gradient-to-r from-blue-500 via-purple-500 to-purple-800 inline-block text-transparent bg-clip-text
                className="font-bold uppercase text-3xl "
              >
                {el.heading}
              </h3>

              <p className="text-zinc-500 mt-2">{el.subheading}</p>

              <p className="text-zinc-300 mt-5">{el.content}</p>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
