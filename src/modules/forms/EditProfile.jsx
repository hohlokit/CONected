import React from "react";
import { useForm } from "react-hook-form";

import {
  Input,
  Button,
  RadioGroup,
  PhoneInput,
  FileUpload,
  Card,
} from "../../components";
import { REQUIRED, EMAIL, PASSWORD } from "../../services/validation";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useAxiosInterceptors } from "../../hooks/useAxiosInterceptors";

const group1 = [
  {
    component: FileUpload,
    name: "avatar",
    label: "Аватар",
  },
  {
    condition: (type) => type === "company",
    component: Input,
    name: "company",
    label: "Назва компанії",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    condition: (type) => type === "student",
    component: Input,
    name: "firstname",
    label: "Імʼя",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    condition: (type) => type === "student",
    component: Input,
    name: "lastname",
    label: "Прізвище",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
];
const group2 = [
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
];

const EditProfileForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: async () => {
      const fields = [
        "firstname",
        "lastname",
        "company",
        "location",
        "email",
        "phone",
      ];
      return fields.reduce((acc, curr) => {
        if (user[curr]) acc[curr] = user[curr];

        return acc;
      }, {});
    },
  });
  useAxiosInterceptors();
  watch("type");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      for (const field in data) {
        if (field === "avatar") {
          if (typeof data[field] && data[field].length)
            formData.append(field, data[field][0]);
        } else if (data[field]) {
          formData.append(field, data[field]);
        }
      }
      const res = await api.post("/users/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
      toast.success("Профіль успішно оновлено");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="p-0 font-bold text-2xl text-white mx-auto">
        Редагувати профіль
      </h2>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col items-center sm:items-start justify-between xl:justify-around md:flex-row  gap-4">
          <div className="flex flex-col items-center gap-4">
            {group1.map(
              ({ options, name, condition, component: Component, ...props }) =>
                !condition || condition(user.type) ? (
                  <Component
                    key={name}
                    {...props}
                    control={control}
                    {...register(name, options)}
                    error={errors[name]?.message}
                  />
                ) : null
            )}
          </div>
          <div className=" flex flex-col items-center gap-4">
            {group2.map(({ options, name, component: Component, ...props }) => (
              <Component
                key={name}
                {...props}
                control={control}
                {...register(name, options)}
                error={errors[name]?.message}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center">
          <Button type="submit">Зберегти</Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
