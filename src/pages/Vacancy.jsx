import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Card, Link, Loader } from "../components";
import VacancyCard from "../modules/VacancyCard";
import { useAxiosInterceptors } from "../hooks/useAxiosInterceptors";
import { api } from "../services/api";

const Vacancy = () => {
  useAxiosInterceptors();
  const [vacancy, setVacancy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const students = {};
  const handleApprove = (studentId) => () => {
    students[studentId] = true;
  };
  const handleReject = (studentId) => () => {
    students[studentId] = false;
  };

  const saveAnswers = async () => {
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
              <div className="w-full flex justify-end">
                <Button onClick={saveAnswers}>Зберегти відповіді</Button>
              </div>
              <div className="flex flex-col w-full">
                {vacancy?.pending?.map((student) => {
                  const name = `${student.firstname} ${student.lastname}`;

                  return (
                    <div
                      className="flex flex-row gap-2 justify-between w-full text-white"
                      key={student.id}
                    >
                      <div className="flex flex-row gap-4">
                        <span>{name}</span>
                        <span>{student.email}</span>
                      </div>
                      <div className="gap-2 flex flex-row">
                        <span
                          aria-disabled={students[student.id] === true}
                          onClick={handleApprove(student.id)}
                          className="cursor-pointer text-steam-text-secondary underline-offset-4 hover:text-steam-text-primary hover:underline"
                        >
                          Підтвердити
                        </span>
                        <span
                          aria-disabled={students[student.id] === false}
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
    </div>
  );
};

export default Vacancy;
