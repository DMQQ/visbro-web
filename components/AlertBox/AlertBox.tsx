import { useTranslations } from "next-intl";

export default function AlertBox(props: {
  variant: "success" | "error" | "hidden";
  translationsNamespace: string;
}) {
  const borderColor = {
    success: "border-green-600",
    error: "border-red-600",
  };

  const textColor = {
    success: "text-green-500",
    error: "text-red-500",
  };

  const t = useTranslations(props.translationsNamespace);

  if (props.variant !== "hidden") {
    const variant = props.variant;

    const title = t(`${variant}.title`);
    const message = t(`${variant}.message`);

    return (
      <div
        className={
          "bg-zinc-800 border-t-4 rounded-b-md mx-2 my-5 px-4 py-3 shadow-md " +
          borderColor[props.variant]
        }
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className={
                "fill-current h-6 w-6  me-4 " + textColor[props.variant]
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p
              className={"text-md rtl:text-xl mb-2 " + textColor[props.variant]}
            >
              {title}
            </p>
            <p className={"text-sm rtl:text-lg " + textColor[props.variant]}>
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
