import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice";
import { useState } from "react";
import Picture from "./Picture";
import axios from "axios";

type Inputs = {
  name: string;
  email: string;
  status?: string;
  password: string;
};

const RegisterForm = () => {
  const { status, error } = useAppSelector((e: any) => e.user);
  const [picture, setPicture] = useState("");
  const [readablePicture, setReadablePicture] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cloudSecret = import.meta.env.VITE_APP_CLOUD_SECRET;
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  // console.log({ status, error });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!picture) {
      return;
    }

    // Upload to cloudinary and then register user
    dispatch(changeStatus("loading"));
    const uploadedPic = await uploadPicture();

    const res = await dispatch(
      registerUser({ ...data, picture: uploadedPic?.url })
    );
    if (res?.payload?.message === "register success") {
      navigate("/");
    }
  };

  // Upload picture function
  const uploadPicture = async () => {
    let formData = new FormData();
    formData.append("upload_preset", `${cloudSecret}`);
    formData.append("file", picture);
    try {
      const res = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data: formData,
      });
      return res?.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Name */}
          <AuthInput
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          {/* Email */}
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          {/* Status */}
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          {/* Password */}
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
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
            {status == "loading" ? <PulseLoader color="#fff" /> : "Sign up"}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-[10px] text-center text-md dark:text-dark_text_1">
            <span>Have an account ?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
