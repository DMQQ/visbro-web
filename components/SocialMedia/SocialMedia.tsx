import clsx from "clsx";
import Image from "next/image";

const socials = [
  "/socials/TikTok.webp",
  "/socials/Youtube.webp",
  "/socials/Facebook.webp",
  "/socials/Instagram.webp",
];

const socialLinks = [
  "https://www.tiktok.com/@visbro.personal.s?_t=8k2Ttg57UZM&_r=1",
  "#",
  "https://www.facebook.com/profile.php?id=61556830941642",
  "#",
];

export default function SocialMedia(props: { classes?: string }) {
  return (
    <div
      className={clsx("gap-2 flex flex-row z-50", {
        [props.classes]: props.classes,
      })}
    >
      {socials.map((social, index) => (
        <a
          href={socialLinks[index]}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            priority
            src={social}
            width={35}
            height={30}
            alt={"social"}
            className="w-8 h-8"
          />
        </a>
      ))}
    </div>
  );
}
