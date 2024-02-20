import { ChangeEventHandler } from "react";

export default function Checkbox(props: {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  onBlur: any;
}) {
  return (
    <div className="flex items-center p-2 my-2">
      <input
        onBlur={props.onBlur}
        id="default-checkbox"
        type="checkbox"
        onChange={props.onChange}
        checked={props.checked}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-zinc-900 dark:text-white"
      >
        {props.label}
      </label>
    </div>
  );
}
