"use client";
import clsx from "clsx";
import "./style.css";
import { useId } from "react";
import SelectReact from "react-select";

export default function Select(props: {
  options: { value: string; label: string }[];
  selected: string;
  label: string;
  isMulti?: boolean;
  onBlur: any;
  onChange:
    | ((value: { value: string; label: string }) => void)
    | ((value: { value: string; label: string }[]) => void);

  error: string;
  isError: boolean;
}) {
  const id = useId();
  return (
    <div className="p-2 w-full">
      <label
        htmlFor={`${props.label}_input`}
        className={clsx(
          "block mb-2 text-sm font-medium text-zinc-900 dark:text-white",
          {
            "!text-red-600": props.isError,
          }
        )}
      >
        {props.label}
      </label>
      <SelectReact
        onBlur={props.onBlur}
        onChange={(v) => props.onChange(v as any)}
        instanceId={id}
        isSearchable
        id="languages-select"
        isMulti={props.isMulti}
        className={clsx("my-react-select-container !rounded-xl ", {
          "react-select-error": props.isError,
        })}
        classNamePrefix="my-react-select"
        placeholder={props.label}
        name={props.label}
        options={props.options}
      />
      {props.isError && <p className="text-red-600 text-sm">{props.error}</p>}
    </div>
  );
}
