import Breadcrumb from "../../../ui-component/Breadcrumb/Breadcrumb";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../../services/admin/authApi";
import SignInForm from "./SignInForm";
import { useState } from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { useAuth } from "../../../constants/index";

const SignIn = () => {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const { onLogin } = useAuth();

  const {
    mutate: onSignIn,
    isPending,
    data: userInfo,
  } = useMutation({
    mutationKey: ["SIGN_IN"],
    mutationFn: (data) => authApi.signIn(data),
    onSuccess: (data) => {
      if (data.role !== "CUSTOMER") {
        return message.error("Tài khoản không tồn tại!");
      }

      if (data.trangThai === 3) {
        setShowUpdatePassword(true);
        return;
      }

      onLogin(data);
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const { mutate: onUpdatePassword, isPending: isUpdating } = useMutation({
    mutationKey: ["UPDATE_PASSWORD"],
    mutationFn: async ({ newPassword }) => {
      const res = await authApi.updatePassword({
        id: userInfo.id,
        newPassword,
      });

      return res;
    },
    onSuccess: () => {
      onLogin(userInfo);
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const onSubmit = (values) => {
    onSignIn(values);
  };

  return (
    <>
      <Breadcrumb title="Đăng nhập" />

      <section className="account py-80">
        <div className="container container-lg">
          {showUpdatePassword ? (
            <UpdatePasswordForm
              onSubmit={onUpdatePassword}
              isLoading={isUpdating}
            />
          ) : (
            <SignInForm onSubmit={onSubmit} isLoading={isPending} />
          )}
        </div>
      </section>
    </>
  );
};

export default SignIn;
