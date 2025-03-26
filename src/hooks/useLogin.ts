/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { login } from "../provider/authenProvider";

type useLoginProps = {
  resource: string;
};

export const useLogin = ({ resource }: useLoginProps) => {
  return useMutation({
    mutationFn: (value: any) => login({ resource, value }),
  });
};
