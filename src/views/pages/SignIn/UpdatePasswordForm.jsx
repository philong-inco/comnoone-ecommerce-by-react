import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const UpdatePasswordForm = (props) => {
  const { onSubmit, isLoading } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-100 tw-w-[800px] tw-mx-auto tw-max-w-full hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100"
    >
      <h6 className="text-xl mb-32">Cập nhật mật khẩu</h6>
      <div className="mb-24">
        <label
          htmlFor="newPassword"
          className="text-neutral-900 text-lg mb-8 fw-medium"
        >
          Password <span className="text-danger">*</span>{" "}
        </label>
        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle type based on state
            className="common-input"
            id="newPassword"
            placeholder="Nhập mật khẩu"
            {...register("newPassword", {
              required: "Vui lòng nhập mật khẩu",
            })}
          />
          <span
            onClick={togglePasswordVisibility}
            className="position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon toggles */}
          </span>
        </div>

        {errors.newPassword && (
          <p className="tw-text-sm tw-text-red-500 tw-mt-1.5">
            {errors.newPassword.message}
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
            Cập nhật mật khẩu
          </Button>
        </div>
      </div>
    </form>
  );
};

UpdatePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default UpdatePasswordForm;
