import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Layout({ children }: any) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
