import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input, Button, Link } from "../../components";
import AuthLayout from "../AuthLayout";

const fields = [
  {
    component: Input,
    name: "email",
    label: "Email",
    type: "text",
    options: {
      required: {
        value: true,
        message: "Обов`язкове поле",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Перевірте ваш Email",
      },
    },
  },
  {
    component: Input,
    name: "password",
    label: "Пароль",
    type: "password",
    options: {
      required: true,
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
    //TODO login request

    localStorage.setItem("auth_token", "token");
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        firstname: "bibka",
        surname: "bobka",
        phone: "0981231234",
        email: "bibka@gmail.com",
        type: "student",
        address: "Kiyv",
        avatar:
          "https://p.djinni.co/66/f2eb368bd125679a422f0d48e647dc/1611751583307_400.jfif",
      })
    );
    navigate("/vacancies");
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
