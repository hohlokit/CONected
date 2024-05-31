import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input, Card, Button, Link } from "../../components";
import { api } from "../../services/api";
import { PASSWORD, REQUIRED } from "../../services/validation";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    component: Input,
    name: "resetCode",
    label: "Код з Email",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    component: Input,
    name: "newPassword",
    label: "Новий пароль",
    type: "password",
    options: {
      required: REQUIRED,
      ...PASSWORD,
    },
  },
];

const NewPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      resetCode: "",
      newPassword: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const email = localStorage.getItem("reset_password_email");
      await api.post("/auth/reset-password", { email, ...data });

      toast.success("Пароль успішно змінено");

      localStorage.removeItem("reset_password_email");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
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

export default NewPasswordForm;
