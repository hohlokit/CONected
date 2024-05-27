import React from "react";
import { useForm } from "react-hook-form";

import { Input, Card, Button, Link } from "../../components";

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
];

const ResetPasswordForm = () => {
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
    <Card>
      <div className="flex flex-col gap-8">
        <h2 className="p-0 font-bold text-2xl text-white">
          Відновлення паролю
        </h2>
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
            <Button type="submit">Підтвердити</Button>
            <Link to="/login">До входу</Link>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ResetPasswordForm;
