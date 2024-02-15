"use client";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface InputProps {
  placeholder?: string;
  required?: boolean;
  id?: string;
  value: string;
  setText?: (text: string) => void;
  type?: HTMLInputTypeAttribute;

  className?: string;
  label: string;
  error?: string;

  onChange?: any;
  onBlur?: any;
  onFocus?: any;

  rest?: any;
}

export default function Input(props: InputProps) {
  const onChange = (e: any) =>
    props.onChange(e) || props.setText?.(e.target.value);

  const isError = !!props.error;

  return (
    <div className="p-2 w-full">
      <label
        htmlFor={props.id}
        className={clsx("block mb-2 text-sm font-medium  dark:text-white", {
          "!text-red-600": !!props.error,
          [props.className as string]: !!props.className,
        })}
      >
        {props.label}
      </label>
      <input
        type={props.type || "text"}
        id={props.id}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        onChange={onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        className={clsx(
          "bg-gray-50 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700",
          {
            [props.className as string]: !!props.className,
            "!text-red-600 !border-red-600": isError,
          }
        )}
        {...props.rest}
      />
      {isError && (
        <p className="mt-0.5 text-sm  dark:text-red-600">{props.error}</p>
      )}
    </div>
  );
}
