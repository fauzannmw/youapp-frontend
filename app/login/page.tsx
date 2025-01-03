"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

import { IoChevronBackOutline } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContext } from "@/app/context/AuthContext";
import { checkIsEmail } from "@/app/common/function";
import { loginUser } from "@/app/common/api";

const FormDataSchema = z.object({
  emailORusername: z
    .string({
      invalid_type_error: "Username or Email format incorrect",
      required_error: "Username or Email format incorrect",
    })
    .min(4, { message: "Username or Email format incorrect" }),
  password: z.string().min(8, { message: "Password format incorrect" }),
});

type Inputs = z.infer<typeof FormDataSchema>;

interface LoginResponse {
  message: string;
  access_token: string;
}

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isloading, setLoading] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const checkEmail = checkIsEmail(data?.emailORusername);

      const responseJson = await loginUser({
        email: checkEmail ? data?.emailORusername : "",
        username: checkEmail ? "" : data?.emailORusername,
        password: data?.password,
      });

      login(responseJson.access_token);
      router.push("/", { scroll: false });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-custom-radial gap-y-10 py-4">
      <a href="/" className="flex flex-row items-center px-2 w-fit font-bold">
        <div className="text-2xl h-full">
          <IoChevronBackOutline />
        </div>
        <span className="text-sm">Back</span>
      </a>

      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-col px-8 gap-y-4"
      >
        <span className="text-2xl font-bold">Login</span>
        <Input
          type="text"
          placeholder="Enter Username/Email"
          variant="faded"
          size="lg"
          radius="sm"
          isInvalid={errors.emailORusername ? true : false}
          errorMessage={
            errors.emailORusername && errors.emailORusername.message
          }
          {...register("emailORusername", { required: true })}
          className="w-full text-sm font-semibold"
          classNames={{
            label: "text-sm",
            input: "text-sm font-semibold",
          }}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          variant="faded"
          size="lg"
          radius="sm"
          isInvalid={errors.password ? true : false}
          errorMessage={errors.password && errors.password.message}
          endContent={
            <Button isIconOnly onClick={togglePassword}>
              {showPassword ? (
                <LuEye className="self-center text-2xl text-default-400" />
              ) : (
                <LuEyeOff className="self-center text-2xl text-default-400" />
              )}
            </Button>
          }
          {...register("password", { required: true })}
          className="w-full text-sm font-semibold"
          classNames={{
            label: "text-sm",
            input: "text-sm font-semibold",
          }}
        />
        <Button
          type="submit"
          size="lg"
          isLoading={isloading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#62CDCB] via-[#62CDCB] to-[#4599DB] text-white font-bold px-4"
        >
          Login
        </Button>
      </form>

      <div className="text-sm text-center w-full flex gap-1 justify-center">
        <span>No Account?</span>
        <a
          href="/register"
          className="bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent underline decoration-[#D5BE88]"
        >
          <u>Register here</u>
        </a>
      </div>
    </main>
  );
}
