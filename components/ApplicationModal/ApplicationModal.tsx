"use client";
import { EntryField } from "@/components/ApplicationForm/CVApplicationForm";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "@/navigation";
import useFormSubmit from "@/utils/useFormSubmit";
import useSelects from "@/utils/useSelects";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import * as Yup from "yup";
import AlertBox from "../AlertBox/AlertBox";
import Input from "../ui/Input/Input";
import DropFile from "../DropFile/DropFile";
import axios from "axios";

const initialValues = {
  dataProcessingConsent: false,
  name: "",
  surname: "",
  phoneNumber: "",
  dateOfBirth: "",
  lastJobPosition: "",
  education: "",
  gender: "",
  hasOwnCar: false,
  civilState: "",
  workStart: "",
  bankName: "",
  bankNumber: "",
  bankCode: "",
  address: "",
  mailAddress: "",
  currentAddress: "",
  emergencyContact: "",
};

const checkboxs = ["dataProcessingConsent", "hasOwnCar"];

const types = {
  phoneNumber: "tel",
  mailAddress: "email",
  bankNumber: "number",
  dateOfBirth: "date",
} as any;

const steps = {
  personalInfo: {
    name: "",
    surname: "",
    phoneNumber: "",
    lastJobPosition: "",
    dataProcessingConsent: false,
  },

  civilState: {
    education: "",
    hasOwnCar: false,
    civilState: "",
    gender: "",
    dateOfBirth: "",
  },

  addressAndContact: {
    workStart: "",
    bankName: "",
    bankNumber: "",
    bankCode: "",
    address: "",
    mailAddress: "",
    currentAddress: "",
    emergencyContact: "",
  },

  files: {
    // documentId: "", driverLicense: ""
  },
};

export default function ApplicationModal({ offerId }: { offerId: string }) {
  const t = useTranslations("ApplicationForm.form");

  const selects = useSelects();

  const formValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t("name.error")),
        surname: Yup.string().required(t("surname.error")),
        phoneNumber: Yup.string().required(t("phoneNumber.error")),
        dateOfBirth: Yup.string().required(t("dateOfBirth.error")),
        lastJobPosition: Yup.string().required(t("lastJobPosition.error")),
        education: Yup.string().required(t("education.error")),
        gender: Yup.string().required(t("gender.error")),
        //hasOwnCar: Yup.boolean().required(t("hasOwnCar.error")),
        civilState: Yup.string().required(t("civilState.error")),
        workStart: Yup.string().required(t("workStart.error")),
        bankNumber: Yup.string().required(t("bankNumber.error")),
        bankName: Yup.string().required(t("bankName.error")),
        bankCode: Yup.string().required(t("bankCode.error")),
        address: Yup.string().required(t("address.error")),
        currentAddress: Yup.string().required(t("currentAddress.error")),
        mailAddress: Yup.string()
          .email(t("mailAddress.errorFormat"))
          .required(t("mailAddress.error")),
        emergencyContact: Yup.string().required(t("emergencyContact.error")),
        dataProcessingConsent: Yup.boolean().oneOf(
          [true],
          t("dataProcessingConsent.error")
        ),
      }),
    []
  );

  const [idFile, setIdFile] = useState<File | null>(null);
  const [driverLicense, setDriverLicense] = useState<File | null>(null);

  const { handleSubmit, state } = useFormSubmit((data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("offerId", offerId);

    formData.append("idFile", idFile!);
    formData.append("driverLicenseFile", driverLicense!);

    return axios.post("/api/job-offer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  const formik = useFormik({
    initialValues,
    async onSubmit(data) {
      handleSubmit(data);
    },
    validationSchema: formValidationSchema,
    initialErrors: {
      name: t("name.error"),
      education: t("education.error"),
      workStart: t("workStart.error"),
    },
    initialTouched: {
      hasOwnCar: true,
    },
  });

  const [step, setStep] = useState<keyof typeof steps>("personalInfo");
  const stepsArray = Object.keys(steps) as (keyof typeof steps)[];
  const currentStepIndex = stepsArray.findIndex((key) => key === step);

  function nextStep() {
    const N = stepsArray.length;

    if (currentStepIndex + 1 < N) {
      setStep(stepsArray[currentStepIndex + 1]);
    }

    if (
      formik.isValid &&
      currentStepIndex === stepsArray.length - 1 &&
      !state.isSuccess
    ) {
      formik.handleSubmit();
    }
  }
  function prevStep() {
    if (currentStepIndex - 1 >= 0) {
      setStep(stepsArray[currentStepIndex - 1]);
    }
  }

  const isError = (() => {
    const stepField = Object.keys(steps[step]);
    const errors = Object.keys(formik.errors);

    for (let errorKey of errors) {
      if (stepField.includes(errorKey)) {
        return true;
      }
    }

    if (
      step === "files" &&
      (idFile === null ||
        idFile === undefined ||
        driverLicense === null ||
        driverLicense === undefined)
    ) {
      return true;
    }

    return false;
  })();

  const params = useSearchParams();

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
  }, [params.get("modal")]);

  const router = useRouter();

  const t2 = useTranslations("ApplicationForm");

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
        className="modal overflow-y-auto w-full sm:w-3/4 md:max-w-lg absolute sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 h-[100vh] sm:max-h-[calc(100vh-10rem)] bg-zinc-900 p-5 rounded-md flex flex-col"
      >
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-white font-bold text-3xl px-2">
            {t2("heading")}
          </h2>
          <button onClick={() => router.back()}>
            <RxCross1 color="#fff" size={25} />
          </button>
        </div>

        <p className="px-2 text-blue-500">
          {t2("step", { from: currentStepIndex + 1, to: stepsArray.length })}
        </p>

        <section className="flex flex-col justify-between flex-1">
          <div className="flex-1">
            {Object.keys(steps[step]).map((key) => (
              <EntryField
                translationNamespace="ApplicationForm.form"
                types={types}
                checkboxs={checkboxs}
                selects={selects}
                formik={formik as any}
                key={key}
                listKey={key as any}
                files={["documentId", "driverLicense"]}
              />
            ))}

            {step === "files" && (
              <div>
                <DropFile
                  multiple={false}
                  onChange={(ev: any) => setIdFile(ev.target.files?.[0])}
                  formats="PNG,JPG,GIF MAX 7MB"
                  label={t(`documentId.text`)}
                />

                <DropFile
                  multiple={false}
                  formats="PNG,JPG,GIF MAX 7MB"
                  onChange={(ev: any) => setDriverLicense(ev.target.files?.[0])}
                  label={t(`driverLicense.text`)}
                />
              </div>
            )}
          </div>

          {currentStepIndex === stepsArray.length - 1 && (
            <AlertBox
              translationsNamespace="FormResponses.POST"
              variant={
                !!state.error ? "error" : state.isSuccess ? "success" : "hidden"
              }
            />
          )}

          <div className="flex py-5">
            <Button
              text={t2("buttons.back")}
              onClick={() => prevStep()}
              className="w-full py-4 flex-[1]"
              type="text"
            />
            <Button
              disabled={isError || (step === "files" && state.isSuccess)}
              text={t2("buttons.next")}
              onClick={() => nextStep()}
              className="w-full py-4 flex-[3]"
            />
          </div>
        </section>
      </section>
    </main>
  );
}
