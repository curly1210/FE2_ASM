/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRegister } from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { mutate } = useRegister({ resource: "register" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigation = useNavigate();

  const onSubmit = async (value: any) => {
    // console.log(value);

    mutate(value, {
      onSuccess: () => {
        toast.success("Đăng ký thành công");
        navigation("/login");
      },
      onError: () => {
        // console.log(error);
        toast.error("Email đã tồn tại", { duration: 1000 });
      },
    });
  };

  return (
    <div className="container max-w-7xl m-auto py-16">
      <h1 className="text-center mb-4 text-2xl font-semibold">Đăng ký</h1>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md w-[650px]"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Email</label>
              <input
                {...register("email", {
                  required: "Email không được để trống",
                })}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors?.email?.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Họ và tên</label>
              <input
                {...register("fullname", {
                  required: "Họ tên không được để trống",
                })}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              />
              {errors.fullname && (
                <span className="text-red-500">
                  {errors?.fullname?.message?.toString()}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Mật khẩu</label>
              <input
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: { value: 6, message: "Tối thiểu 6 ký tự" },
                })}
                type="password"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors?.password?.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Xác nhận mật khẩu</label>
              <input
                {...register("confirmPassword", {
                  required: "Xác nhận không được để trống",
                  validate: (value) =>
                    value === watch("password") || "Mật khẩu không trùng khớp",
                })}
                type="password"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors?.confirmPassword?.message?.toString()}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Số điện thoại</label>
              <input
                {...register("phone", {
                  required: "Họ tên không được để trống",
                })}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              />
              {errors.phone && (
                <span className="text-red-500">
                  {errors?.phone?.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 font-semibold">Giới tính</label>
              <select
                {...register("sex", {
                  required: "Chọn giới tính",
                })}
                name="sex"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              >
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-yellow-600 text-white py-2 px-3 rounded hover:bg-yellow-700 duration-200">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
