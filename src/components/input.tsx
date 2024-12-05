import { HTMLInputTypeAttribute } from "react";
import { camalize, classNames } from "../utils";

type InputProps = {
  type?: HTMLInputTypeAttribute;
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  [key: string]: any;
  disabled?: boolean;
};

export default function Input({
  type = "text",
  label = "",
  inputClassName = "",
  labelClassName = "",
  disabled = false,
  ...props
}: InputProps) {
  const labelId = camalize(label);
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={labelId}
          className={classNames(
            "block text-sm font-semibold text-gray-700",
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      {type == "textarea" ? (
        <div className="mt-1">
          <textarea
            id={labelId}
            name={labelId}
            disabled={disabled}
            className={classNames(
              "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
              inputClassName
            )}
            {...props}
            autoComplete="off"
          ></textarea>
        </div>
      ) : (
        <div className="mt-1">
          <input
            id={labelId}
            name={labelId}
            type={type}
            // required
            disabled={disabled}
            className={classNames(
              "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
              inputClassName
            )}
            {...props}
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
