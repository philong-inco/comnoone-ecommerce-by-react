import { useForm } from "react-hook-form";
import { REG_EMAIL } from "../../../constants/reg";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../../constants/routes";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignInForm = (props) => {
  const { onSubmit, isLoading } = props;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-100 tw-w-[800px] tw-mx-auto tw-max-w-full hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100"
    >

      <div className="mb-24">
        <label
          htmlFor="email"
          className="text-neutral-900 text-lg mb-8 fw-medium"
        >
          Email <span className="text-danger">*</span>{" "}
        </label>
        <input
          type="text"
          className="common-input"
          id="email"
          placeholder="Nhập địa chỉ email"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: REG_EMAIL,
              message: "Email không đúng định dạng",
            },
          })}
        />

        {errors.email?.message && (
          <p className="tw-text-sm tw-text-red-500 tw-mt-1.5">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-24">
        <label
          htmlFor="password"
          className="text-neutral-900 text-lg mb-8 fw-medium"
        >
          Password <span className="text-danger">*</span>{" "}
        </label>
        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="common-input"
            id="password"
            placeholder="Nhập mật khẩu"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
            })}
          />
          <span
            className="position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon changes */}
          </span>
        </div>

        {errors.password?.message && (
          <p className="tw-text-sm tw-text-red-500 tw-mt-1.5">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-24 mt-48">
        <div className="flex-align gap-48 flex-wrap">
          <Button
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className="btn btn-main tw-py-6 tw-px-8 tw-flex tw-items-center tw-justify-center"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
      <div className="mt-48">
        <Link
          to={ROUTE_PATH.FORGOT_PASSWORD}
          className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
        >
          Quên mật khẩu?
        </Link>
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SignInForm;
