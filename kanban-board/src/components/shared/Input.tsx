import React from "react";

interface Props {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "email";
  value: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  name,
  onBlur,
  onChange,
  type,
  value,
  error,
  touched,
  disabled,
}) => {
  return (
    <div className="flex flex-col space-y-1 my-2">
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}:
      </label>
      <input
        autoComplete={type === "password" ? "off" : "on"}
        type={type}
        value={value}
        name={name}
        id={name}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        className={`${
          error && touched
            ? "border-red-500 bg-red-100"
            : "border-gray-400 bg-white hover:border-indigo-300 focus:border-indigo-400"
        } px-4 py-2 text-sm text-gray-700 rounded-lg border `}
      />
      {error && touched ? (
        <p className="text-red-500 text-xs italic mt-2">{error}</p>
      ) : null}
    </div>
  );
};

export default React.memo(Input);
