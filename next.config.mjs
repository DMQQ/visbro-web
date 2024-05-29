import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");
export default {
  ...withNextIntl({}),

  images: {
    unoptimized: true,

    domains: [
      "localhost",
      "/api/images",
      "https://visbro-web.vercel.app",
      "https://visbro-web-dmqqs-projects.vercel.app",
      "https://visbro-web.vercel.app/pl",
    ],

    remotePatterns: [
      {
        protocol: "https", // Specify the protocol (http or https)
        hostname: "visbro-web.vercel.app", // Specify the hostname of your Vercel app
        port: "", // Specify the port if needed, leave empty if not using a custom port
        pathname: "/pl/api/images/**", // Specify the pathname pattern to match your route
      },
    ],
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
