"use client";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
} from "react";

interface DropFileProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  formats: string;

  maxFileCount?: number;

  hideImagePreview?: boolean;

  accept?: string;
}

export default function DropFile(props: DropFileProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImagePreviews: string[] = [];

      for (
        let i = 0;
        i < Math.min(files.length, props.maxFileCount || 2);
        i++
      ) {
        const file = files[i];
        const reader = new FileReader();

        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === "string") {
            newImagePreviews.push(result);
          }

          if (
            newImagePreviews.length ===
            Math.min(files.length, props.maxFileCount || 2)
          ) {
            setImagePreviews(newImagePreviews);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="p-2">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-lg"
        htmlFor="file_input"
      >
        {props.label}
      </label>
      <input
        onBlur={props.onBlur}
        accept={props.accept}
        className="file:bg-zinc-800 file:text-zinc-300 file:border-none block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        multiple={props.multiple}
        onChange={(ev) => {
          props?.onChange?.(ev);
          handleImageChange(ev);
        }}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        {props.formats}
      </p>

      {!props.hideImagePreview && (
        <div className="mt-2 flex flex-row w-full gap-2">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-32 max-h-32"
            />
          ))}
        </div>
      )}
    </div>
  );
}
