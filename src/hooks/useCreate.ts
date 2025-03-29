import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../provider/dataProvider";

type useCreateProps = {
  resource: string;
};

const useCreate = ({ resource }: useCreateProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: any) => create({ resource, variables }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [resource],
      });
    },
  });
};

export default useCreate;
