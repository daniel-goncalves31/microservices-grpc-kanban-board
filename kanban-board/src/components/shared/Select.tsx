import React from "react";
import ReactSelect, { ValueType } from "react-select";
import { enumToArray } from "../../utils/enumToArray";

interface Props {
  onChange: (priority: any) => void;
  type: any;
  initialValue?: ValueType<{ value: string; label: string }>;
  name: string;
  label: string;
  loading: boolean;
}

const Select: React.FC<Props> = ({
  type,
  initialValue,
  name,
  loading,
  label,
  onChange,
}) => {
  const options = enumToArray(type);

  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={name}>
        {label}:
      </label>
      <ReactSelect
        onChange={onChange}
        options={options}
        defaultValue={initialValue}
        name={name}
        id={name}
        isLoading={loading}
        isDisabled={loading}
      />
    </div>
  );
};

export default Select;
