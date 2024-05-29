import React, { useEffect, useState } from "react";
import cn from "classnames";

import VacancyCard from "../modules/VacancyCard";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

// filter = all | applied | approved | declined | active | inactive

const mock = [
  {
    tags: ["hot", "paid"],
    logo: "https://p.djinni.co/6c/b8ce44fa87ab1de45801927bfc3f43/istockphoto-916632674-612x612_400.jpeg",
    vacancy: "Javascript backend/frontend developer MERN stack", //vacancy name
    name: "Infopups", //company name
    description:
      " ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ", //description of
    time: 2, //created time
    address: "Kiev",
    approvedStudents: [],
    appliedStudents: [],
    declinedStudents: [],
    email: "biba0@gmail.com",
    phone: "+38098205110",
  },
  {
    tags: ["hot", "paid"],
    logo: "https://p.djinni.co/6c/b8ce44fa87ab1de45801927bfc3f43/istockphoto-916632674-612x612_400.jpeg",
    vacancy: "Javascript backend/frontend developer MERN stack", //vacancy name
    name: "Infopups", //company name
    description:
      " ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ", //description of
    time: 2, //created time
    address: "Kiev",
    approvedStudents: [],
    appliedStudents: [],
    declinedStudents: [1],
    email: "biba1@gmail.com",
    phone: "+38098205111",
  },
  {
    tags: ["hot", "paid"],
    logo: "https://p.djinni.co/6c/b8ce44fa87ab1de45801927bfc3f43/istockphoto-916632674-612x612_400.jpeg",
    vacancy: "Javascript fullstack developer", //vacancy name
    name: "Infopups", //company name
    description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ", //description of
    time: 1, //created time
    address: "Kiev",
    approvedStudents: [1],
    appliedStudents: [],
    declinedStudents: [],
    email: "biba2@gmail.com",
    phone: "+38098205112",
  },
  {
    students: [],
    tags: ["hot", "paid"],
    logo: "https://p.djinni.co/6c/b8ce44fa87ab1de45801927bfc3f43/istockphoto-916632674-612x612_400.jpeg",
    vacancy: "Javascript backend/frontend developer MERN stack", //vacancy name
    name: "Infopups", //company name
    description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ", //description of
    time: 3, //created time
    address: "Kiev",
    approvedStudents: [],
    appliedStudents: [1],
    declinedStudents: [],
    email: "biba3@gmail.com",
    phone: "+38098205113",
  },
];

const filters = [
  {
    value: "all",
    label: "Усі",
    types: ["student", "company"],
  },
  {
    value: "applied",
    label: "Подані заявки",
    types: ["student"],
  },
  {
    value: "approved",
    label: "Підтверджені",
    types: ["student"],
  },
  {
    value: "declined",
    label: "Відмовлені",
    types: ["student"],
  },
  {
    value: "active",
    label: "Підтверджені",
    types: ["company"],
  },
  {
    value: "inactive",
    label: "Відмовлені",
    types: ["company"],
  },
];
const Vacancies = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [vacansies, setVacancies] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    //TODO request with filter on vacansies
    setVacancies(mock);
  }, [filter]);

  const handleChangeFilter = (val) => () => setFilter(val);
  const handleCreateVacancy = () => navigate("/create-vacancy");

  return (
    <div className="flex justify-between flex-wrap gap-12 pt-4">
      <div className="flex flex-row w-full justify-between items-center">
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
        {user.type === "company" && (
          <Button onClick={handleCreateVacancy}>Створити вакансію</Button>
        )}
      </div>
      {vacansies.length === 0 && (
        <p className="w-full text-center text-white text-lg">
          Нажаль в даний момент вакансій немає, поверніться, будь ласка,
          пізніше:)
        </p>
      )}
      {vacansies.map((company) => {
        const studentId = Number(user?.id);
        const isApplied = company?.appliedStudents?.includes(studentId);
        const isApproved = company?.approvedStudents?.includes(studentId);
        const isDeclined = company?.declinedStudents?.includes(studentId);

        return (
          <VacancyCard
            key={company.time}
            isApproved={isApproved}
            isDeclined={isDeclined}
            isApplied={isApplied}
            isStudent={user?.type === "student"}
            {...company}
          />
        );
      })}
    </div>
  );
};

export default Vacancies;
