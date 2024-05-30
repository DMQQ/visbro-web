import { NextIntlClientProvider, useMessages } from "next-intl";

import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: any) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}

      <Analytics />
    </NextIntlClientProvider>
  );
}
