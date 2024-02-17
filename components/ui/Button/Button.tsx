const ButtonTypes = {
  primay:
    "bg-blue-900 hover:bg-blue-800 active:bg-blue-700 text-white rounded-md focus:ring-4 focus:ring-blue-700",
  secondary:
    "bg-purple-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md focus:ring-4 focus:ring-4 focus:ring-purple-700",
  text: "px-4 py-3",
  outline: "border border-blue-600 rounded-md",
};

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;

  type?: keyof typeof ButtonTypes;
}

export default function Button({ type = "primay", ...props }: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`text-white transition font-medium text-sm px-5 py-2.5 me-2 mb-2  disabled:dark:bg-zinc-800 hover:disabled:dark:bg-zinc-800 ${
        ButtonTypes[type]
      } ${props.className || ""}`}
    >
      {props.text}
    </button>
  );
}
