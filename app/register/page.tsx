"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoChevronBackOutline } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { registerUser } from "@/app/common/api";

const FormDataSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email format incorrect",
        required_error: "Email format incorrect",
      })
      .min(4, { message: "Email format incorrect" })
      .email("Email format incorrect"),
    username: z
      .string({
        invalid_type_error: "Username format incorrect",
        required_error: "Username format incorrect",
      })
      .min(4, { message: "Username format incorrect" }),
    password: z.string().min(8, { message: "Password format incorrect" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password format incorrect" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type Inputs = z.infer<typeof FormDataSchema>;

export default function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isloading, setLoading] = useState(false);

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
      await registerUser({
        email: data?.email,
        username: data?.username,
        password: data?.password,
      });
      router.push("/login", { scroll: false });
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
        <span className="text-2xl font-bold">Register</span>
        <Input
          type="email"
          placeholder="Enter Email"
          variant="faded"
          size="lg"
          radius="sm"
          isInvalid={errors.email ? true : false}
          errorMessage={errors.email && errors.email.message}
          {...register("email", { required: true })}
          className="w-full text-sm font-semibold"
          classNames={{
            label: "text-sm",
            input: "text-sm font-semibold",
          }}
        />
        <Input
          type="text"
          placeholder="Create Username"
          variant="faded"
          size="lg"
          radius="sm"
          isInvalid={errors.username ? true : false}
          errorMessage={errors.username && errors.username.message}
          {...register("username", { required: true })}
          className="w-full text-sm font-semibold"
          classNames={{
            label: "text-sm",
            input: "text-sm font-semibold",
          }}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Create Password"
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
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          variant="faded"
          size="lg"
          radius="sm"
          isInvalid={errors.confirmPassword ? true : false}
          errorMessage={
            errors.confirmPassword && errors.confirmPassword.message
          }
          endContent={
            <Button isIconOnly onClick={togglePassword}>
              {showPassword ? (
                <LuEye className="self-center text-2xl text-default-400" />
              ) : (
                <LuEyeOff className="self-center text-2xl text-default-400" />
              )}
            </Button>
          }
          {...register("confirmPassword", { required: true })}
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
          Register
        </Button>
      </form>

      <div className="text-sm text-center w-full flex gap-1 justify-center">
        <span>Have an Account?</span>
        <a
          href="/login"
          className="bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent underline decoration-[#D5BE88]"
        >
          <u>Login here</u>
        </a>
      </div>
    </main>
  );
}
