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

  const contactFormValidationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(t("name.error")),
      surname: Yup.string().required(t("surname.error")),
      companyName: Yup.string().required(t("companyName.error")),
      jobPosition: Yup.string().required(t("jobPosition.error")),
      phoneNumber: Yup.string().required(t("phoneNumber.error")),
      email: Yup.string()
        .email(t("email.errorFormat"))
        .required(t("email.error")),
      message: Yup.string(),
    });
  }, []);

  return (
    <article className="w-full md:w-2/3 lg:w-3/5 xl:w-1/3 p-5">
      <section className="dark:dark:bg-zinc-900 p-2 rounded-md w-full">
        <Formik
          validationSchema={contactFormValidationSchema}
          onSubmit={() => {}}
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
                  files={[]}
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
