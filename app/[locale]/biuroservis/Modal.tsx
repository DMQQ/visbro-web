"use client";
import {
  EntryField,
  TextArea,
} from "@/components/ApplicationForm/CVApplicationForm";
import Input from "@/components/ui/Input/Input";
import { Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import Button from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";

import * as Yup from "yup";
import AlertBox from "@/components/AlertBox/AlertBox";
import useFormSubmit from "@/utils/useFormSubmit";
import axios from "axios";

export default function Modal() {
  const params = useSearchParams();

  const service = params.get("service");
  const type = params.get("type");

  useEffect(() => {
    if (document) {
      if (params.get("modal") === "true") {
        document.body.style.position = "fixed";
        document.body.style.top = `-${window.scrollY}px`;
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = ``;
    };
  }, []);

  const initialValues = {
    email: "",
    phoneNumber: "",
    name: "",
    surname: "",

    ...(type === "services" && { service }),

    ...(type === "car-rental" && {
      car: "",
    }),

    additionalInfo: "",
  };

  const t = useTranslations("Biuroservis");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t("form.email.error")),
    phoneNumber: Yup.string().required(t("form.phoneNumber.error")),
    name: Yup.string().required(t("form.name.error")),
    surname: Yup.string().required(t("form.surname.error")),

    additionalInfo: Yup.string().required(t("form.additionalInfo.error")),
  });

  const router = useRouter();

  const { handleSubmit, state } = useFormSubmit((data) => {
    return axios.post("/api/collaboration", data);
  });

  if (params.get("modal") === "true")
    return (
      <main
        tabIndex={10}
        style={{
          background: "rgba(0,0,0,0.7)",
          zIndex: 1000,
        }}
        className="modal-overlay fixed top-0 w-screen h-screen"
      >
        <section
          tabIndex={11}
          className="modal w-full overflow-y-auto sm:w-3/4 md:max-w-lg absolute sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 h-[100vh] sm:max-h-[calc(100vh-10rem)] bg-zinc-900 p-5 rounded-md flex flex-col"
        >
          <div className="flex flex-row justify-between p-2 mb-5">
            <h2 className="font-bold text-xl">{t("form.heading")}</h2>
            <button onClick={() => router.back()}>
              <RxCross1 color="#fff" size={25} />
            </button>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {(f) => (
              <>
                <EntryField
                  translationNamespace="Biuroservis.form"
                  formik={f}
                  listKey="email"
                  types={{ email: "email" }}
                />
                <div className="flex flex-col sm:flex-row">
                  <EntryField
                    translationNamespace="Biuroservis.form"
                    formik={f}
                    listKey="name"
                  />
                  <EntryField
                    translationNamespace="Biuroservis.form"
                    formik={f}
                    listKey="surname"
                  />
                </div>
                <EntryField
                  translationNamespace="Biuroservis.form"
                  formik={f}
                  listKey="phoneNumber"
                  types={{ phoneNumber: "tel" }}
                />
                <Input
                  label="Wybrana usługa"
                  value={f.values.service || ""}
                  onChange={() => {}}
                  rest={{ disabled: true }}
                  className="!text-zinc-400"
                />
                <TextArea
                  formik={f}
                  formKey="additionalInfo"
                  label="Dodatkowe informacje"
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
                <div className="p-2">
                  <Button
                    disabled={!(f.isValid && f.dirty)}
                    className="w-full py-4"
                    onClick={() => {}}
                    text={t("form.button")}
                  />
                </div>
              </>
            )}
          </Formik>
        </section>
      </main>
    );

  return null;
}
