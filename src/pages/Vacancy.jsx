import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cn from "classnames";
import { Tooltip } from "react-tooltip";

import { Button, Card, Loader } from "../components";
import VacancyCard from "../modules/VacancyCard";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
import { api } from "../services/api";

const Vacancy = () => {
  useAxiosInterceptors();
  const [vacancy, setVacancy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState({});

  const { id } = useParams();

  const getVacancy = async () => {
    try {
      const res = await api.get(`/vacancies/${id}`);

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVacancy().then((res) => setVacancy(res));
  }, []);

  useEffect(() => {
    console.log(students);
  }, [students]);

  const handleApprove = (studentId) => () => {
    if (students[studentId] !== true)
      setStudents({ ...students, [studentId]: true });
  };
  const handleReject = (studentId) => () => {
    if (students[studentId] !== false)
      setStudents({ ...students, [studentId]: false });
  };

  const saveAnswers = async () => {
    console.log(students);
    return;
    try {
      await api.post(`/vacancies/${id}`, students);

      toast.success("Збережено успішно");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <VacancyCard isStudent={false} {...vacancy} />
          <Card>
            <div className="flex flex-col gap-4 w-full">
              {vacancy?.pending.length > 0 && (
                <div className="w-full flex justify-end">
                  <Button onClick={saveAnswers}>Зберегти відповіді</Button>
                </div>
              )}
              <div className="flex flex-col w-full">
                {vacancy?.pending.length === 0 && (
                  <span className="mx-auto text-white">
                    Нажаль, на даний момент заявок подано не було, поверніться,
                    будь ласка, пізніше:)
                  </span>
                )}
                {vacancy?.pending?.map((student) => {
                  const name = `${student.firstname} ${student.lastname}`;

                  return (
                    <div
                      className="flex flex-row gap-2 justify-between w-full text-white border-b py-2"
                      key={student.id}
                    >
                      <div className="flex flex-row gap-4">
                        <span
                          className="cursor-default w-36"
                          data-tooltip-id={"student-bio"}
                          data-tooltip-content={student.bio}
                        >
                          {name}
                        </span>
                        <span className="hidden md:block md:w-40">{student.email}</span>
                        <span className="hidden lg:block md:w-20">{student.location}</span>
                      </div>
                      <div className="gap-2 flex flex-col sm:flex-row">
                        <span
                          disabled={students[student.id] === true}
                          onClick={handleApprove(student.id)}
                          className={cn(
                            "cursor-pointer text-steam-text-secondary underline-offset-4 hover:text-steam-text-primary hover:underline text-steam-text-primary",
                            {
                              "text-steam-text-primary":
                                students[student.id] === true,
                            }
                          )}
                        >
                          Підтвердити
                        </span>
                        <span
                          disabled={students[student.id] === false}
                          onClick={handleReject(student.id)}
                          className="cursor-pointer text-red-700 underline-offset-4 hover:text-steam-text-primary hover:underline"
                        >
                          Відмовити
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      )}
      <Tooltip className="max-w-96" id={"student-bio"} />
    </div>
  );
};

export default Vacancy;
