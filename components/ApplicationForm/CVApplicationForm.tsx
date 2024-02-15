"use client";
import { FormikProps, useFormik } from "formik";
import ValidatedInput from "../ValidatedInput/ValidatedInput";
import { useTranslations } from "next-intl";
import Button from "../ui/Button/Button";
import Select from "../ui/Select/Select";
import Checkbox from "../ui/Checkbox/Checkbox";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import DropFile from "../DropFile/DropFile";
import PhonePrefixSelection from "../PhonePrefixSelection/PhonePrefixSelection";
import clsx from "clsx";

const initialValues = {
  dataProcessingConsent: false,
  name: "",
  surname: "",
  phoneNumber: "",
  dateOfBirth: "",
  lastJobPosition: "",
  education: "", // podstawowe, zawodowe (jakie), średnie, wyższe, doktorat?
  gender: "",
  age: "",
  hasOwnCar: false,
  civilState: "", // żonaty, rozwodnik, w związku nieformalnym, wdowiec, rodzic samotnie wychowujący dzieci.
  workStart: "",
  bankName: "",
  bankNumber: "",
  bankCode: "",
  address: "",
  mailAddress: "",
  currentAddress: "",
  emergencyContact: "",
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

const checkboxs = ["dataProcessingConsent", "hasOwnCar"];

const types = {
  phoneNumber: "tel",
  mailAddress: "email",
  bankNumber: "number",
  dateOfBirth: "date",
  age: "number",
} as any;

export default function CVAplicationForm() {
  const t = useTranslations("ApplicationForm.form");

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
        age: Yup.string().required(t("age.error")),
        hasOwnCar: Yup.string().required(t("hasOwnCar.error")),
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

  const formik = useFormik({
    initialValues,
    onSubmit() {},
    validationSchema: formValidationSchema,
  });

  return (
    <section className="p-2 w-full sm:max-w-md">
      {Object.keys(initialValues).map((key) => (
        <EntryField
          translationNamespace="ApplicationForm.form"
          types={types}
          checkboxs={checkboxs}
          selects={selects}
          formik={formik as any}
          key={key}
          listKey={key as any}
        />
      ))}

      <DropFile label="Prawo jazdy" formats="PNG, JPG, GIF max 7MB" />
      <DropFile label="Dowód osobisty" formats="PNG, JPG, GIF max 7MB" />

      <div className="p-2">
        <Button
          onClick={formik.handleSubmit}
          disabled={!(formik.isValid && formik.dirty)}
          text="Aplikuj"
          className="w-full py-4"
        />
      </div>
    </section>
  );
}

export const EntryField = ({
  formik,
  listKey: key,
  checkboxs = [],
  selects,
  types = {},
  translationNamespace,
  files,
}: {
  formik: any;
  listKey: string;
  selects?: {
    [key: string]: readonly string[];
  };
  files?: string[];
  checkboxs?: readonly string[];
  types?: {
    [key: string]: string;
  };
  translationNamespace: string;
}) => {
  const t = useTranslations(translationNamespace);

  if (["phoneNumber", "phone"].includes(key)) {
    return (
      <PhonePrefixSelection
        savedValue={formik.values[key]}
        key={key}
        label={t(`${key}.text`)}
        error={
          formik.touched[key] && formik.errors[key] ? formik.errors[key] : ""
        }
        id={`${key}_input`}
        value={formik.values[key]}
        onBlur={formik.handleBlur(key)}
        onSave={(v) => formik.setFieldValue(key, v)}
      />
    );
  }

  if (typeof key !== "undefined" && key in (selects || {}))
    return (
      <Select
        label={t(`${key}.text`)}
        options={selects![key] as any}
        selected={formik.values[key]}
        onChange={formik.handleChange(key)}
      />
    );

  if (checkboxs.includes(key)) {
    return (
      <Checkbox
        checked={formik.values[key] as boolean}
        label={t(`${key}.text`)}
        onChange={formik.handleChange(key)}
      />
    );
  }

  if (files?.includes(key))
    return <DropFile formats="JPG,GIF,PNG max 7MB" label={t(`${key}.text`)} />;

  return (
    <ValidatedInput
      key={key}
      formik={formik}
      label={t(`${key}.text`)}
      id={`${key}_input`}
      className="w-full"
      fieldName={key}
      type={types[key as any] || "text"}
      error={
        formik.touched[key] && formik.errors[key] ? formik.errors[key] : ""
      }
    />
  );
};

export const TextArea = ({
  formKey,
  formik,
  label,
  rows,
}: {
  formKey: string;
  formik: any;
  label: string;
  rows: number;
}) => (
  <div className="p-2" key={formKey}>
    <label
      htmlFor={`${formKey}_input`}
      className={clsx("block mb-2 text-sm font-medium   dark:text-white", {
        "!text-red-600": !!formik.errors[formKey] && formik.touched[formKey],
      })}
    >
      {label}
    </label>

    <textarea
      value={formik.values[formKey]}
      onChange={formik.handleChange(formKey)}
      onBlur={formik.handleBlur(formKey)}
      name={formKey}
      id={`${formKey}_input`}
      rows={rows}
      className={clsx(
        "bg-zinc-800 resize-none p-2 border outline-none focus:border-blue-600 border-zinc-600 rounded-md w-full",
        {
          "text-red-600 !border-red-600": !!formik.errors[formKey],
        }
      )}
    />
    {!!formik.errors[formKey] && (
      <p className="text-red-600 text-xs">{formik.errors[formKey]}</p>
    )}
  </div>
);
