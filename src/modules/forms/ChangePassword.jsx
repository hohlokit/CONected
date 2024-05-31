import React from "react";
import { useForm } from "react-hook-form";

import { PASSWORD, REQUIRED } from "../../services/validation";
import { Button, Input } from "../../components";
import { api } from "../../services/api";
import { useAxiosInterceptors } from "../../hooks/useAxiosInterceptors";

const fields = [
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
  {
    component: Input,
    name: "newPassword",
    label: "Новий пароль",
    type: "password",
    options: {
      required: REQUIRED,
      minLength: PASSWORD.minLength,
      validate: (str, { confirmPassword }) => {
        const res = PASSWORD.validate(str);
        if (res) return res;

        if (confirmPassword && str !== confirmPassword)
          return "Паролі не співпадають";
      },
    },
  },
  {
    component: Input,
    name: "confirmPassword",
    label: "Повторіть",
    type: "password",
    options: {
      required: REQUIRED,
      minLength: PASSWORD.minLength,
      validate: (str, { newPassword }) => {
        const res = PASSWORD.validate(str);
        if (res) return res;

        if (newPassword && str !== newPassword) return "Паролі не співпадають";
      },
    },
  },
];

const ChangePasswordForm = () => {
  useAxiosInterceptors();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/users/change-password", {
        currentPassword: data.password,
        newPassword: data.newPassword,
      });
      toast.success("Пароль успішно оновлено");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  watch("newPassword");
  watch("confirmPassword");
  return (
    <div className="flex flex-col gap-8 border-steam-text-primary xl:border-l xl:pl-10">
      <h2 className="p-0 font-bold text-2xl text-white ">Змінити пароль</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(
          ({ options, name, condition, component: Component, ...props }) => (
            <Component
              key={name}
              {...props}
              {...register(name, options)}
              error={errors[name]?.message}
            />
          )
        )}
        <div className="flex flex-row items-center justify-center">
          <Button type="submit">Зберегти</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
