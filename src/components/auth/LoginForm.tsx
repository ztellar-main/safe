import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../features/userSlice";

type Inputs = {
  email?: string;

  password?: string;
};

const LoginForm = () => {
  const { status, error } = useAppSelector((e: any) => e.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log({ status, error });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await dispatch(signInUser({ ...data }));
    if (res?.payload?.message === "login success") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Email */}
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />

          {/* Password */}
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {/* If we have an error */}
          {error && (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {status == "loading" ? <PulseLoader color="#fff" /> : "Sign in"}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-[10px] text-center text-md dark:text-dark_text_1">
            <span>You do not have an account ?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to="/register"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
