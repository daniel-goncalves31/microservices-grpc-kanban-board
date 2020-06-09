import React from "react";

interface Props {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "email";
  value: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  onBlur,
  onChange,
  type,
  value,
}) => {
  return (
    <div className="flex flex-col space-y-1 my-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}:
      </label>
      <input
        autoComplete={type === "password" ? "off" : "on"}
        type={type}
        defaultValue={value}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-md border border-gray-200  hover:border-indigo-300 focus:border-indigo-400"
      />
    </div>
  );
};

export default Input;
