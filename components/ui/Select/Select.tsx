import { ChangeEventHandler } from "react";

export default function Select(props: {
  options: [{ value: string; label: string }] | string[];
  selected: string;
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="p-2 w-full">
      <label
        htmlFor={`${props.label}_input`}
        className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
      >
        {props.label}
      </label>
      <select
        value={props.selected}
        onChange={props.onChange}
        id={`${props.label}_input`}
        className="outline-none border-zinc-700 border text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {props.options.map((option) => (
          <option
            key={option.toString()}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
