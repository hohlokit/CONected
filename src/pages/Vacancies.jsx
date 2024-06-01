import React, { useEffect, useState } from "react";
import cn from "classnames";
import { toast } from "react-toastify";

import VacancyCard from "../modules/VacancyCard";
import { Button, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
import { useDebouncedCallback } from "use-debounce";

// filter = all | applied | approved | declined | active | inactive

const filters = [
  {
    value: "all",
    label: "Усі",
    types: ["student"],
  },
  {
    value: "pending",
    label: "Подані заявки",
    types: ["student"],
  },
  {
    value: "approved",
    label: "Підтверджені",
    types: ["student"],
  },
  {
    value: "rejected",
    label: "Відмовлені",
    types: ["student"],
  },
];
const Vacancies = () => {
  useAxiosInterceptors();

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [vacansies, setVacancies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getVacancies = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/vacancies?filter=${filter}&search=${search}`);

      return res?.data || [];
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVacancies().then((res) => setVacancies(res || []));
  }, [filter, search]);

  const handleChangeFilter = (val) =>
    useDebouncedCallback(() => setFilter(val));
  const handleCreateVacancy = () => navigate("/create-vacancy");

  const goToVacancy = (id) => () => {
    if (user?.type === "company") navigate(`/vacancy/${id}`);
  };

  return (
    <div className="flex justify-between flex-wrap gap-12 pt-4 flex-col">
      <div className="flex flex-row w-full justify-between items-center">
        <div>
          <input
            name={"search"}
            placeholder="Пошук"
            className={
              "bg-steam-component-input border-steam-component-input font-normal text-base text-white rounded p-2.5 w-full min-w-64 lg:min-w-96 outline-none hover:bg-steam-component-inputHover"
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
          />
        </div>

        {user.type === "company" ? (
          <Button onClick={handleCreateVacancy}>Створити вакансію</Button>
        ) : (
          <div className="flex flex-row gap-4 text-white pointer">
            {filters.map(
              ({ value, label, types }) =>
                types.includes(user.type) && (
                  <div
                    key={value}
                    className={cn(
                      "cursor-pointer hover:text-steam-text-secondary",
                      {
                        "underline underline-offset-4 text-steam-text-primary":
                          value === filter,
                      }
                    )}
                    onClick={handleChangeFilter(value)}
                  >
                    {label}
                  </div>
                )
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {vacansies.map((vacancy) => {
          const studentId = Number(user?.id);
          const isApplied = vacancy?.pending?.includes(studentId);
          const isApproved = vacancy?.approved?.includes(studentId);
          const isDeclined = vacancy?.rejected?.includes(studentId);

          return (
            <VacancyCard
              onClick={goToVacancy(vacancy.id)}
              key={vacancy.createdAt}
              isApproved={isApproved}
              isDeclined={isDeclined}
              isApplied={isApplied}
              isStudent={user?.type === "student"}
              {...vacancy}
            />
          );
        })}
        {vacansies.length === 0 &&
          (isLoading ? (
            <div className="w-full flex flex-row justify-center">
              <Loader />
            </div>
          ) : (
            <p className="w-full text-center text-white text-lg">
              Нажаль в даний момент вакансій немає, поверніться, будь ласка,
              пізніше:)
            </p>
          ))}
      </div>
    </div>
  );
};

export default Vacancies;
