import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useQueryData = (key, path, currentPage) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: [key, currentPage],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: {
          page: currentPage,
        },
      }).then((res) => res?.data && res?.data),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
  });
};

export const useUserData = ({ currentPage }) => {
  console.log(currentPage, "currentPage in usequery");
  return useQueryData(["user"], "api/v1/user/list", currentPage);
};

export const useSingleUserData = () =>
  useQueryData(["singleUser", "api/v1/user/"]);

export const useStudentData = () =>
  useQueryData(["student"], "api/v1/student/list/");

export const useRoleData = () => useQueryData(["roles"], "api/v1/role/list/");

export const useRolePermissionData = () =>
  useQueryData(["roles_Permission"], "api/v1/role/permissions/");

export const useCategoryPermissionData = () =>
  useQueryData(["category_Permission"], "api/v1/category/permissions/");

export const useCourseData = () =>
  useQueryData(["course"], "api/v1/school/courses/");

export const useCourseSkillData = () =>
  useQueryData(["courseSkill"], "api/v1/school/course");
