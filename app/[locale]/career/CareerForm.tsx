"use client";
import {
  EntryField,
  TabSelect,
  TextArea,
} from "@/components/ApplicationForm/CVApplicationForm";
import Button from "@/components/ui/Button/Button";
import { languages } from "@/utils/languagesList";
import useSelects from "@/utils/useSelects";
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
      hasDriverLicenseCatB: Yup.string().required(
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
    hasDriverLicenseCatB: false,
    civilState: "",
  };

  const selects = useSelects();

  const types = {
    phoneNumber: "tel",
    mailAddress: "email",
    bankNumber: "number",
    dateOfBirth: "date",
    age: "number",
    additionalInfo: "textarea",
  } as any;

  return (
    <article className="w-full md:w-2/3 lg:w-3/5 xl:w-1/3 p-5 mt-10 ">
      <section className="dark:dark:bg-zinc-900 p-2 rounded-md w-full">
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
              <div className="flex flex-col sm:flex-row">
                <EntryField
                  translationNamespace="Career.form"
                  formik={f}
                  listKey={"name"}
                  types={types}
                />
                <EntryField
                  translationNamespace="Career.form"
                  formik={f}
                  listKey={"surname"}
                  types={types}
                />
              </div>
              <EntryField
                translationNamespace="Career.form"
                formik={f}
                listKey={"email"}
                types={types}
              />

              <div className="flex flex-col sm:flex-row">
                <EntryField
                  translationNamespace="Career.form"
                  formik={f}
                  listKey="education"
                  selects={selects}
                  types={types}
                />
                <EntryField
                  translationNamespace="Career.form"
                  formik={f}
                  listKey="gender"
                  selects={selects}
                />
              </div>

              <EntryField
                multiSelect
                translationNamespace="Career.form"
                formik={f}
                listKey="languages"
                selects={{
                  languages: Object.entries(languages).map(([key, native]) => ({
                    label: native,
                    value: native,
                  })),
                }}
              />

              <EntryField
                translationNamespace="Career.form"
                formik={f}
                listKey="civilState"
                selects={selects}
              />

              <TabSelect
                options={["Tak", "Nie"]}
                label={t("hasDriverLicenseCatB.text")}
                formik={f}
                formKey="hasDriverLicenseCatB"
              />

              <TextArea
                formKey="additionalInfo"
                formik={f}
                label={t("additionalInfo.text")}
                rows={8}
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
    </article>
  );
};

export default Form;
