import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function useSelects() {
  const t = useTranslations("Selects");

  const parse = (v: string) => ({ value: v, label: v });

  const selects = useMemo(
    () => ({
      education: t("education").split(";").map(parse),
      civilState: t("civilState").split(";").map(parse),
      gender: t("gender").split(";").map(parse),
      driverLicense: t("driverLicense").split(";"),
    }),
    []
  );

  return selects as any;
}
