import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useMutate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params) => {
      const path = params[0];
      const data = params[1];
      return axios.post(`${process.env.REACT_APP_SERVER_URL}/${path}`, data);
    },
    {
      onSuccess: (data) => {
        console.log(data, "===line 40");
      },
      onError: () => {
        alert("There was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );
};
