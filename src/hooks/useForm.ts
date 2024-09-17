import { useCallback, useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [inputs, setInputs] = useState<T>(initialState);

  const handleChange = useCallback(
    (event: any) => {
      const name = event.target.name;
      const type = event.target.type;
      const value =
        type === "checkbox" ? event.target.checked : event.target.value;

      setInputs((values) => ({ ...values, [name]: value }));
    },
    [setInputs]
  );
  return [inputs, handleChange] as const;
};
