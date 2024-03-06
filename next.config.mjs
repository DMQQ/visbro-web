import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");
export default withNextIntl({
  env: {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    BASE_API_URL: process.env.BASE_API_URL,
    DATABASE_ID: process.env.DATABASE_ID,
    TEAM_ID: process.env.TEAM_ID,
  },
});
