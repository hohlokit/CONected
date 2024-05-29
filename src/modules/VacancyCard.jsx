import React, { useState } from "react";
import cn from "classnames";

import { Button, Card, Link } from "../components";

const tagsById = {
  hot: {
    color: "text-[#ff3b30]",
    bg: "bg-[#ff3b30]/30",
    label: "Гаряча",
  },
  paid: {
    color: "text-[#005cb8]",
    bg: "bg-[#005cb8]/30",

    label: "Оплачувана",
  },
};

const VacancyCard = ({
  tags = [],
  logo,
  vacancy,
  name,
  description,
  address,
  phone,
  time,
  email,
  isApplied,
  isApproved,
  isDeclined,
  isStudent,
}) => {
  const [isApplicationSent, setIsApplicationSent] = useState(isApplied);
  const handleClick = () => {
    //TODO add request for applying

    setIsApplicationSent(true);
  };

  const result = () => {
    switch (true) {
      case isApproved:
        return (
          <p className="min-h-10 text-green-700">
            Заявка була підтведженна компанією, очікуйте на дзвінок/Email,
            <br /> або звя`жіться з компанією за номером{" "}
            <Link
              className="font-bold text-steam-text-primary underline underline-offset-4"
              to={`tel:${phone}`}
            >
              {phone}
            </Link>
            , <br />
            або за допомогою Email{" "}
            <Link
              className="font-bold text-steam-text-primary underline underline-offset-4"
              href={`mailto:${email}`}
            >
              {email}
            </Link>
          </p>
        );
      case isDeclined:
        return (
          <p className="h-10 flex items-center justify-center text-red-700">
            Нажаль вам було відмовлено в цій заявці, спробуйте подати заявку в
            інші компанії
          </p>
        );
      case isApplicationSent || isApplied:
        return (
          <p className="h-10 flex items-center justify-center text-green-700">
            Заявку успішно подано, очікуйте на підтвердження від компанії.
          </p>
        );
      default:
        return (
          <div className="flex justify-end w-full">
            <Button onClick={handleClick}>Подати заявку</Button>
          </div>
        );
    }
  };

  return (
    <Card className="rounded-xl flex-col gap-4 justify-between sm:w-full">
      <div className="flex flex-col justify-start gap-4">
        <div className="flex flex-row w-full gap-2">
          {tags.map((tag) => {
            return (
              <span
                key={tag}
                className={cn(
                  "px-2 py-1 text-sm rounded-full",
                  tagsById[tag].bg,
                  tagsById[tag].color
                )}
              >
                {tagsById[tag].label}
              </span>
            );
          })}
        </div>
        <div className="w-full flex flex-row gap-8 justify-between items-center ">
          <span className="text-2xl text-white font-medium">{vacancy}</span>
          <img
            className="w-20 h-20 object-contain"
            alt={`${name}-${vacancy}-logo`}
            src={logo}
          />
        </div>
        <div className="flex text-white">
          <b>{name}</b>, {address}
        </div>
        <p className="text-white text-justify">{description}</p>
      </div>
      {isStudent && result()}
    </Card>
  );
};

export default VacancyCard;
