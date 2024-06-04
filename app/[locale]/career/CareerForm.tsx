"use client";
import AlertBox from "@/components/AlertBox/AlertBox";
import {
  EntryField,
  TabSelect,
  TextArea,
} from "@/components/ApplicationForm/CVApplicationForm";
import DropFile from "@/components/DropFile/DropFile";
import Button from "@/components/ui/Button/Button";
import { languages } from "@/utils/languagesList";
import useFormSubmit from "@/utils/useFormSubmit";
import useSelects from "@/utils/useSelects";
import axios from "axios";
import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import * as Yup from "yup";

const Form = () => {
  const t = useTranslations("Career.form");
  const tErr = useTranslations("Forms");
  const contactFormValidationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string()
        .required(t("name.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      surname: Yup.string()
        .required(t("surname.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      email: Yup.string()
        .email()
        .required(t("email.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      education: Yup.string()
        .required(t("education.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      gender: Yup.string()
        .required(t("gender.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      languages: Yup.string()
        .required(t("languages.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      hasDriverLicenseCatB: Yup.string().required(
        t("hasDriverLicenseCatB.error")
      ),

      civilState: Yup.string()
        .required(t("civilState.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      additionalInfo: Yup.string()
        .min(200)
        .max(1000)
        .required(t("additionalInfo.error")),
    });
  }, [t, tErr]);

  const initialFormValues = {
    email: "",
    education: "",
    gender: "",
    hasDriverLicenseCatB: "",
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

  const [CVFile, setCVFile] = useState<File | null>(null);

  const { handleSubmit, state } = useFormSubmit((data) => {
    return axios.post("/api/career", data);
  });

  const onSubmit = async (props: any) => {
    const formData = new FormData();

    Object.keys(props).forEach((key) => formData.append(key, props[key]));

    formData.append("cv", CVFile!);

    await handleSubmit(formData);
  };

  return (
    <article className="w-full md:w-2/3 lg:w-3/5 xl:w-1/3 p-5 mt-10 ">
      <section className="dark:dark:bg-zinc-900 p-2 rounded-md w-full">
        <Formik
          validationSchema={contactFormValidationSchema}
          onSubmit={onSubmit}
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

              <div className="flex flex-col sm:flex-row">
                <EntryField
                  multiSelect
                  translationNamespace="Career.form"
                  formik={f}
                  listKey="languages"
                  selects={{
                    languages: Object.entries(languages).map(
                      ([key, native]) => ({
                        label: native,
                        value: native,
                      })
                    ),
                  }}
                />

                <EntryField
                  translationNamespace="Career.form"
                  formik={f}
                  listKey="civilState"
                  selects={selects}
                />
              </div>

              <TabSelect
                options={selects.driverLicense}
                label={t("hasDriverLicenseCatB.text")}
                formik={f}
                formKey="hasDriverLicenseCatB"
              />

              <DropFile
                hideImagePreview
                multiple={false}
                onChange={(ev: any) => setCVFile(ev.target.files?.[0])}
                formats="DOCX, DOC, PDF, PNG, JPG etc"
                label={"CV (Curriculum Vitae)"}
              />

              <TextArea
                formKey="additionalInfo"
                formik={f}
                label={t("additionalInfo.text")}
                rows={7}
              />

              <AlertBox
                translationsNamespace="FormResponses.POST"
                variant={
                  !!state.error
                    ? "error"
                    : state.isSuccess
                    ? "success"
                    : "hidden"
                }
              />

              <div className="p-2">
                <Button
                  loading={state.loading}
                  disabled={
                    !(f.isValid && f.dirty) || state.isSuccess || !CVFile
                  }
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
