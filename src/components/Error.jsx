import React from 'react';
import { useTranslation } from 'react-i18next';
import { T_ERRORS } from 'src/constants/translate/prefixes';
import { TYPE_STRING } from 'src/constants/types';

const Error = ({ children, showError }) => {
  const { t } = useTranslation();

  if (!showError) return null;

  const errorText =
    typeof children === TYPE_STRING
      ? t(`${T_ERRORS} - ${children}`)
      : t(`${T_ERRORS} - ${children.i18nKey}`, children.i18nParams);

  return <div className="pt-2 pl-2 text-left text-red-primary">{errorText}</div>;
};

export default Error;
