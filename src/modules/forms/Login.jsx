import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input, Button, Link } from "../../components";
import AuthLayout from "../AuthLayout";
import { api } from "../../services/api";
import { EMAIL, PASSWORD, REQUIRED } from "../../services/validation";
import { toast } from "react-toastify";

const fields = [
  {
    component: Input,
    name: "email",
    label: "Email",
    type: "text",
    options: {
      required: REQUIRED,
      pattern: EMAIL,
    },
  },
  {
    component: Input,
    name: "password",
    label: "Пароль",
    type: "password",
    options: {
      required: REQUIRED,
      ...PASSWORD,
    },
  },
];

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/vacancies");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <h2 className="p-0 font-bold text-2xl text-white">Вхід</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map(({ options, name, component: Component, ...props }) => (
            <Component
              key={name}
              {...props}
              {...register(name, options)}
              error={errors[name]?.message}
            />
          ))}
          <div className="flex flex-row items-center justify-between pt-4">
            <Button type="submit">Увійти</Button>
            <Link to="/reset-password">Забули пароль?</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
