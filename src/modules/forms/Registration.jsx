import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Input,
  Button,
  RadioGroup,
  PhoneInput,
  FileUpload,
} from "../../components";
import AuthLayout from "../AuthLayout";
import { REQUIRED, EMAIL, PHONE, PASSWORD } from "../../services/validation";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    component: RadioGroup,
    label: "Тип профілю",
    buttons: [
      { value: "company", label: "Компанія" },
      { value: "student", label: "Студент" },
    ],
    name: "type",
    options: {
      required: REQUIRED,
    },
  },
  {
    component: FileUpload,
    name: "avatar",
    label: "Аватар",
  },
  {
    condition: (values) => values.type === "company",
    component: Input,
    name: "company",
    label: "Назва компанії",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    condition: (values) => values.type === "student",
    component: Input,
    name: "firstname",
    label: "Імʼя",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    condition: (values) => values.type === "student",
    component: Input,
    name: "lastname",
    label: "Прізвище",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
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
    name: "location",
    label: "Місто",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    component: PhoneInput,
    name: "phone",
    label: "Телефон",
    type: "tel",
    mask: "+##(###) ## ### ##",
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

const RegistrationForm = () => {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      type: "student",
      location: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  watch("type");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const field in data) {
        if (field === "avatar") formData.append(field, data[field][0]);
        else formData.append(field, data[field]);
      }
      const res = await api.post("/auth/registration", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { token, user } = res.data;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/vacancies");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        <h2 className="p-0 font-bold text-2xl text-white">Реєстрація</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map(
            ({ options, name, condition, component: Component, ...props }) =>
              !condition || condition(getValues()) ? (
                <Component
                  key={name}
                  {...props}
                  control={control}
                  {...register(name, options)}
                  error={errors[name]?.message}
                />
              ) : null
          )}
          <div className="flex flex-row items-center justify-between pt-4">
            <Button type="submit">Зареєструватися</Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegistrationForm;
