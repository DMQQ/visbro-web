"use client";
import ValidatedInput from "../ValidatedInput/ValidatedInput";
import { useTranslations } from "next-intl";
import Button from "../ui/Button/Button";
import Select from "../ui/Select/Select";
import Checkbox from "../ui/Checkbox/Checkbox";
import { useState } from "react";
import DropFile from "../DropFile/DropFile";
import PhonePrefixSelection from "../PhonePrefixSelection/PhonePrefixSelection";
import clsx from "clsx";

interface EntryFieldProps {
  formik: any;
  listKey: string;
  selects?: {
    [key: string]: { value: string; label: string }[];
  };
  multiSelect?: boolean;
  files?: string[];
  checkboxs?: readonly string[];
  types?: {
    [key: string]: string;
  };
  translationNamespace: string;
}

export const EntryField = ({
  formik,
  listKey: key,
  checkboxs = [],
  selects,
  types = {},
  translationNamespace,
  files,
  ...rest
}: EntryFieldProps) => {
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
        onBlur={formik.handleBlur(key)}
        onChange={(v) => formik.setFieldValue(key, v)}
      />
    );
  }

  if (typeof key !== "undefined" && key in (selects || {})) {
    return (
      <Select
        value={formik.values[key]}
        onBlur={formik.handleBlur(key)}
        label={t(`${key}.text`)}
        options={selects![key] as any}
        onChange={(output: any) => {
          formik.setFieldValue(
            key,
            rest.multiSelect
              ? output!.map(({ value }: any) => value).join(", ")
              : output.value
          );
        }}
        isMulti={rest.multiSelect}
        error={
          formik.touched[key] && formik.errors[key] && formik.values[key] === ""
            ? formik.errors[key]
            : ""
        }
      />
    );
  }

  if (checkboxs.includes(key)) {
    return (
      <Checkbox
        checked={formik.values[key] as boolean}
        label={t(`${key}.text`)}
        onChange={formik.handleChange(key)}
        onBlur={formik.handleBlur(key)}
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

export const TabSelect = ({
  formKey,
  formik,
  label,
  options,
}: {
  formKey: string;
  formik: any;
  label: string;
  options: string[];
}) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="p-2" key={formKey}>
      <label
        htmlFor={`${formKey}_input`}
        className={clsx("block mb-2 text-sm font-medium   dark:text-white", {
          "!text-red-600": !!formik.errors[formKey] && formik.touched[formKey],
        })}
      >
        {label}
      </label>

      <div className="flex gap-2 rounded-md">
        {options.map((opt) => (
          <Button
            key={opt}
            onClick={() => {
              setSelected(opt);
              formik.setFieldValue(formKey, opt);
            }}
            className={clsx("flex-1 bg-zinc-900", {
              "!bg-blue-900 !ring-0": opt === selected,
            })}
            text={opt}
          />
        ))}
      </div>

      {!!formik.errors[formKey] && (
        <p className="text-red-600 text-xs">{formik.errors[formKey]}</p>
      )}
    </div>
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
          "text-red-600 !border-red-600":
            !!formik.errors[formKey] && formik.touched[formKey],
        }
      )}
    />
    {!!formik.errors[formKey] && formik.touched[formKey] && (
      <p className="text-red-600 text-xs">{formik.errors[formKey]}</p>
    )}
  </div>
);
