import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Input, RadioGroup, TextArea } from "../../components";
import { REQUIRED } from "../../services/validation";
import { useAxiosInterceptors } from "../../hooks/useAxiosInterceptors";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    component: Input,
    name: "title",
    label: "Назва вакансії",
    type: "text",
    options: {
      required: REQUIRED,
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
    component: TextArea,
    name: "description",
    label: "Опис вакансії",
    type: "text",
    options: {
      required: REQUIRED,
    },
  },
  {
    component: RadioGroup,
    label: "Оплачувана",
    buttons: [
      { value: "true", label: "Так" },
      { value: "false", label: "Ні" },
    ],
    name: "isPaid",
    options: {
      required: REQUIRED,
    },
  },
];

const CreateVacancy = () => {
  useAxiosInterceptors();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      isPaid: 0,
      location: "",
      title: "",
      description: "",
    },
  });

  const onSubmit = async ({ isPaid, location, title, description }) => {
    try {
      await api.post("/vacancies/create", {
        isPaid: isPaid === "true",
        location,
        title,
        description,
      });

      navigate("/vacancies");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  return (
    <Card>
      <div className="w-full flex flex-col gap-8">
        <h2 className="p-0 font-bold text-2xl text-white ">
          Cтворити вакансії
        </h2>
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
            <Button type="submit">Створити</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CreateVacancy;
