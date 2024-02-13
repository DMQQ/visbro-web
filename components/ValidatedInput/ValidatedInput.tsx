import { FormikProps } from "formik";
import Input, { InputProps } from "../ui/Input/Input";

interface ValidatedInputProps extends Omit<InputProps, "value" | "setText"> {
  formik: any;

  fieldName: any;
  label: string;
}

function ValidatedInput(props: ValidatedInputProps) {
  return (
    <Input
      value={props.formik.values[props.fieldName]}
      onChange={props.formik.handleChange(props.fieldName)}
      onBlur={props.formik.handleBlur(props.fieldName)}
      error={
        !!props.formik.errors[props.fieldName] &&
        props.formik.touched[props.fieldName]
          ? props.formik.values[props.fieldName]
          : ""
      }
      {...props}
    />
  );
}

export default ValidatedInput;
