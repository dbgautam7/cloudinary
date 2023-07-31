import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

export const useMutate = (queryKey, basePath) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (params) => {
      const requestData = {
        method: params[0],
        url: basePath + params[1],
        data: params[2],
      };
      const response = await axiosPrivate(requestData);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: (err) => {
      return err?.response?.data;
    },
  });
  return mutation;
};

export const useAuthMutation = () =>
  useMutate(["auth"], "auth/v1/account/login/");

export const useStudentProfileMutation = () =>
  useMutate(["studentProfile"], "api/v1/student/");

export const useLogoutMutation = () =>
  useMutate(["logout"], "auth/v1/account/logout/");

export const useUserMutation = () => useMutate(["user"], "api/v1/user/");
