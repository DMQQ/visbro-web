"use client";

import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { useMemo } from "react";
import Button from "@/components/ui/Button/Button";
import { Formik } from "formik";
import {
  EntryField,
  TextArea,
} from "@/components/ApplicationForm/CVApplicationForm";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Career({ params: { locale } }: any) {
  const t = useTranslations("Career");
  // unstable_setRequestLocale(locale);
  return (
    <main
      style={{
        backgroundImage: "url(/bg.svg)",
        marginBottom: "4rem",
      }}
      className="w-full min-h-screen p-3 md:p-5 flex flex-col lg:flex-row items-center justify-start lg:items-start lg:justify-around mt-5 md:mt-32"
    >
      <section className="w-full p-5 lg:w-3/5 xl:w-1/3 mb-10 ">
        <h1 className="text-4xl lg:text-5xl font-bold text-white bg-zinc-950 mt-16">
          {t("heading")}
        </h1>
        <p className="text-zinc-200 mt-10 text-xl bg-zinc-950">
          {t("content")}
        </p>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
        </div>
      </section>
      <Form />
    </main>
  );
}

const Form = () => {
  const t = useTranslations("Career.form");
  const contactFormValidationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(t("name.error")),
      surname: Yup.string().required(t("surname.error")),
      email: Yup.string().email().required(t("email.error")),
      education: Yup.string().required(t("education.error")),
      gender: Yup.string().required(t("gender.error")),
      languages: Yup.string().required(t("languages.error")),
      hasDriverLicenseCatB: Yup.boolean().oneOf(
        [true],
        t("hasDriverLicenseCatB.error")
      ),
      civilState: Yup.string().required(t("civilState.error")),
      additionalInfo: Yup.string()
        .min(200)
        .max(1000)
        .required(t("additionalInfo.error")),
    });
  }, []);

  const initialFormValues = {
    email: "",
    education: "",
    gender: "",
    languages: "",
    hasDriverLicenseCatB: false,
    civilState: "",
  };

  const selects = {
    education: ["Podstawowe", "Zawodowe", "Średnie", "Wyższe", "Tytuł doktora"],
    civilState: [
      "Żonaty",
      "Rozwodnik",
      "W związku nieformalnym",
      "Wdowiec",
      "Rodzic samotnie wychowywujący dzieci",
    ],
    gender: ["Kobieta", "Mężczyzna", "Inne"],
  };

  const checkboxs = ["hasDriverLicenseCatB", "hasBeenArrested"];

  const types = {
    phoneNumber: "tel",
    mailAddress: "email",
    bankNumber: "number",
    dateOfBirth: "date",
    age: "number",
    additionalInfo: "textarea",
  } as any;

  return (
    <section className="dark:bg-zinc-900 p-2 rounded-md py-5 w-full max-w-md">
      <Formik
        validationSchema={contactFormValidationSchema}
        onSubmit={() => {}}
        initialValues={{
          name: "",
          surname: "",
          ...initialFormValues,
          additionalInfo: "",
        }}
      >
        {(f: any) => (
          <>
            <div className="flex">
              <EntryField
                translationNamespace="Career.form"
                formik={f}
                listKey={"name"}
              />
              <EntryField
                translationNamespace="Career.form"
                formik={f}
                listKey={"surname"}
              />
            </div>
            {Object.keys(initialFormValues).map((formKey) => (
              <EntryField
                translationNamespace="Career.form"
                types={types}
                formik={f}
                listKey={formKey}
                checkboxs={checkboxs}
                selects={selects}
                key={formKey}
              />
            ))}

            <TextArea
              formKey="additionalInfo"
              formik={f}
              label={t("additionalInfo.text")}
              rows={10}
            />

            <div className="p-2">
              <Button
                disabled={!(f.isValid && f.dirty)}
                onClick={f.handleSubmit}
                className={`py-3 w-full`}
                text={t("submit")}
              />
            </div>
          </>
        )}
      </Formik>
    </section>
  );
};
