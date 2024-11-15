import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api";
import { useAuth } from "../hooks/useAuth";

export const useProfile = () => {
  const { isLogin, userInfo } = useAuth();

  return useQuery({
    queryKey: ["GET_PROFILE"],
    queryFn: async () => {
      const r = await apiClient.get(`/nhanvien/${userInfo.id}`);
      return r;
    },
    enabled: isLogin,
  });
};

