import createNextIntlPlugin from "next-intl/plugin";
import { hostname } from "os";

const withNextIntl = createNextIntlPlugin("./i18n.ts");
export default {
  ...withNextIntl({}),

  images: {
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
      {
        protocol: "https", // Specify the protocol (http or https)
        hostname: "visbro-web-dmqqs-projects.vercel.app", // Specify the hostname of your Vercel app
        port: "", // Specify the port if needed, leave empty if not using a custom port
        pathname: "/api/images/**", // Specify the pathname pattern to match your route
      },
      {
        hostname: "visbro.de",
        pathname: "/api/images/**",
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
