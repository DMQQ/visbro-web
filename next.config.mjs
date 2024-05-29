import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");
export default {
  ...withNextIntl({}),

  images: {
    domains: ["localhost", "/api/images", "https://visbro-web.vercel.app"],
  },

  async rewrites() {
    return [
      {
        source: "/:locale/api/images/:imageName",
        destination: "/api/images/:imageName",
      },
    ];
  },
};
