import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Input, Card, Button } from "../components";

const fields = [
  {
    component: Input,
    name: "email",
    label: "Email",
    type: "text",
    options: {
      required: true,
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

const LoginForm = () => {
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
    <div className="flex flex-col gap-8">
      <h2 className="p-0 font-bold text-2xl text-steam-text-primary">Вхід</h2>
      <Card>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map(({ options, name, component: Component, ...props }) => (
            <Component
              key={name}
              {...props}
              {...register(name, options)}
              error={errors[name]?.message}
            />
          ))}
          <Button type="submit">Увійти</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
