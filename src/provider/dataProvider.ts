/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "../interface/type";
import { config } from "../api/axios";

// const API_URL = "http://localhost:3000";
// const API_URL = "https://api.fake-rest.refine.dev";

type getListParams = {
  resource: string;
};

type createParams = {
  resource: string;
  variables: Omit<IProduct, "id">;
};

type updateParams = {
  resource: string;
  variables: IProduct;
  id: number;
};

type getOneParams = {
  resource: string;
  id: number;
};

type deleteParams = {
  resource: string;
  id: number;
};

const dataProvider = {
  getList: async ({ resource }: getListParams) => {
    try {
      const response = await config.get(`/${resource}`);
      if (response.status !== 200) new Error("Error");

      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getOne: async ({ resource, id }: getOneParams) => {
    try {
      const response = await config.get(`/${resource}/${id}`);
      if (response.status !== 200) new Error("Error");

      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  create: async ({ resource, variables }: createParams) => {
    try {
      const response = await config.post(`/${resource}`, variables);
      if (response.status !== 201) new Error("Error");

      return {
        success: true,
        // data: response.data,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  update: async ({ resource, variables, id }: updateParams) => {
    try {
      const response = await config.put(`/${resource}/${id}`, variables);
      if (response.status !== 200) new Error("Error");

      return {
        success: true,
        // data: response.data,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  remove: async ({ resource, id }: deleteParams) => {
    try {
      const response = await config.delete(`/${resource}/${id}`);
      if (response.status !== 200) new Error("Error");

      return {
        success: true,
        // data: response.data,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export const { getList, getOne, create, update, remove } = dataProvider;
