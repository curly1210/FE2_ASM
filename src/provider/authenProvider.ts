/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "../api/axios";

type registerProps = {
  resource: string;
  value: any;
};

type loginProps = {
  resource: string;
  value: any;
};

const dataProvider = {
  register: async ({ resource, value }: registerProps) => {
    const response = await config.post(`/${resource}`, value);
    return response.data;
  },
  login: async ({ resource, value }: loginProps) => {
    const response = await config.post(`/${resource}`, value);
    return response.data;
  },
};

export const { register, login } = dataProvider;
