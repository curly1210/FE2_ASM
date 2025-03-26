/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { register } from "../provider/authenProvider";

type useRegisterProps = {
  resource: string;
};

export const useRegister = ({ resource }: useRegisterProps) => {
  return useMutation({
    mutationFn: (value: any) => register({ resource, value }),
  });
};
