import { useState, useRef, type FC } from "react";
import type { TokenInputProps } from "../types/props";

export const TokenInput: FC<TokenInputProps> = ({
  length = 6,
  onComplete,
  onIncomplete,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    new Array(length).fill(null)
  );

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return; // allow letters & numbers only

    const newValues = [...values];
    newValues[index] = value.toUpperCase(); // uppercase for consistency
    setValues(newValues);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const token = newValues.join("");
    if (token.length === length && !newValues.includes("")) {
      onComplete?.(token);
    } else {
      onIncomplete?.();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="text"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-10 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
        />
      ))}
    </div>
  );
};
