import { FieldErrors } from "react-hook-form";
import { FormValues } from "../lib/data.type";

interface ErrorMessageProps {
  errors: FieldErrors<FormValues>;
  fieldName: keyof FormValues; // better typing for field names
}

const errorMessageCSS = "text-red-500 text-sm";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, fieldName }) => {
  const error = errors[fieldName];

  if (!error) return null;

  return <p className={errorMessageCSS}>{error.message as string}</p>;
};

export default ErrorMessage;
