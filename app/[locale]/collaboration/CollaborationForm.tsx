"use client";
import AlertBox from "@/components/AlertBox/AlertBox";
import {
  EntryField,
  TextArea,
} from "@/components/ApplicationForm/CVApplicationForm";
import Button from "@/components/ui/Button/Button";
import useFormSubmit from "@/utils/useFormSubmit";
import axios from "axios";
import { Formik } from "formik";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import * as Yup from "yup";

const initialFormValues = {
  name: "",
  surname: "",
  companyName: "",
  jobPosition: "",
  phoneNumber: "",
  email: "",
  message: "",
};

const Form = () => {
  const t = useTranslations("Collaboration.form");
  const tErr = useTranslations("Forms");

  const contactFormValidationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string()
        .required(t("name.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      surname: Yup.string()
        .required(t("surname.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      companyName: Yup.string()
        .required(t("companyName.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      jobPosition: Yup.string()
        .required(t("jobPosition.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      phoneNumber: Yup.string()
        .required(t("phoneNumber.error"))
        .max(16, tErr("length", { min: 0, max: 16 })),
      email: Yup.string()
        .email(t("email.errorFormat"))
        .required(t("email.error"))
        .max(50, tErr("length", { min: 0, max: 50 })),
      message: Yup.string().max(1000, tErr("length", { min: 0, max: 1000 })),
    });
  }, []);

  const { handleSubmit, state } = useFormSubmit((data) => {
    return axios.post("/api/collaboration", data);
  });

  const onSubmit = async (props: any) => {
    await handleSubmit(props);
  };

  return (
    <article className="w-full md:w-2/3 lg:w-3/5 xl:w-1/3 p-5">
      <section className="dark:dark:bg-zinc-900 p-2 rounded-md w-full">
        <Formik
          validationSchema={contactFormValidationSchema}
          onSubmit={onSubmit}
          initialValues={initialFormValues}
        >
          {(f: any) => (
            <>
              <div className="flex flex-col sm:flex-row">
                <EntryField
                  formik={f}
                  listKey={"name"}
                  translationNamespace="Collaboration.form"
                />
                <EntryField
                  formik={f}
                  listKey={"surname"}
                  translationNamespace="Collaboration.form"
                />
              </div>

              <div className="flex flex-col sm:flex-row">
                <EntryField
                  formik={f}
                  listKey={"companyName"}
                  translationNamespace="Collaboration.form"
                />
                <EntryField
                  formik={f}
                  listKey={"jobPosition"}
                  translationNamespace="Collaboration.form"
                />
              </div>

              <EntryField
                formik={f}
                listKey={"email"}
                types={{ email: "email" }}
                translationNamespace="Collaboration.form"
              />

              <EntryField
                formik={f}
                listKey={"phoneNumber"}
                translationNamespace="Collaboration.form"
              />

              <TextArea
                formik={f}
                formKey="message"
                label={t("message.text")}
                rows={5}
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

              <div className="px-2 mt-2">
                <Button
                  loading={state.loading}
                  buttonType="submit"
                  disabled={!(f.isValid && f.dirty) || state.isSuccess}
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
