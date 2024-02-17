import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface DropFileProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  formats: string;
}

export default function DropFile(props: DropFileProps) {
  return (
    <div className="p-2">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        {props.label}
      </label>
      <input
        {...props}
        className="file:bg-zinc-800 file:text-zinc-300 file:border-none block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        multiple
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        {props.formats}
      </p>
    </div>
  );
}
