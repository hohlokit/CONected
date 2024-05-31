export const REQUIRED = {
  value: true,
  message: "Обов`язкове поле",
};

export const EMAIL = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Перевірте ваш Email",
};

export const PHONE = {
  minLength: { value: 18, message: "Перевірте ваш номер телефону" },
  pattern: {
    value: /^\+38\(\d{3}\) \d{2} \d{3} \d{2}$/gm,
    message: "Перевірте ваш номер телефону",
  },
};

export const PASSWORD = {
  minLength: {
    value: 8,
    message: "Пароль повинен містити щонайменше 8 символів",
  },
  validate: (pass) => {
    if (!new RegExp(/(?=.*\d)/i).test(pass)) {
      return "Пароль повинен містити щонайменше 1 цифру";
    }
    if (!new RegExp(/(?=.*[a-z])/).test(pass)) {
      return "Пароль повинен містити щонайменше 1 букву нижнього регістру";
    }
    if (!new RegExp(/(?=.*[A-Z])/).test(pass)) {
      return "Пароль повинен містити щонайменше 1 букву верхнього регістру";
    }
    if (new RegExp(/(?=.*[-+_!@#$%^&*.,?])/i).test(pass)) {
      return "Пароль не повинен містити спеціальних символів";
    }
  },
};
