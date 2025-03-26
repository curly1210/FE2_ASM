/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthen } from "../../Context/AuthContext";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { setUser } = useAuthen();
  const { mutate } = useLogin({ resource: "login" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const navigation = useNavigate();

  const onSubmit = async (value: any) => {
    mutate(value, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        toast.success("Đăng nhập thành công");
      },
      onError: () => {
        toast.error("Đăng nhập thất bại");
      },
    });
  };

  return (
    <div className="container max-w-7xl m-auto py-16">
      <h1 className="text-center mb-4 text-2xl font-semibold">Đăng nhập</h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md w-80"
        >
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Email</label>
            <input
              {...register("email", { required: "Email không được để trống" })}
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
            <label className="mb-1 font-semibold">Mật khẩu</label>
            <input
              {...register("password", {
                required: "Mật khẩu không được để trống",
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
          <div className="flex justify-center">
            <button className="bg-yellow-600 text-white py-2 px-3 rounded hover:bg-yellow-700 duration-200">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
