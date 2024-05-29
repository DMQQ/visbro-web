import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");
export default {
  ...withNextIntl({}),

  images: {
    domains: [
      "./public/images",
      "/api/images",
      "https://visbro-web.vercel.app/pl/api/images",
    ],
  },
};
