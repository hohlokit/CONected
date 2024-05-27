import React from "react";
import { useForm } from "react-hook-form";

import { Input, Card, Button, Link } from "../../components";
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
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Перевірте ваш Email",
      },
    },
  },
];

const RegistrationForm = () => {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <h2 className="p-0 font-bold text-2xl text-white">Реєстрація</h2>
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
            <Button type="submit">Зареєструватися</Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegistrationForm;
