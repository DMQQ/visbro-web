"use client";
import {
  EntryField,
  TextArea,
} from "@/components/ApplicationForm/CVApplicationForm";
import Button from "@/components/ui/Button/Button";
import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as Yup from "yup";

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

export default Form;
