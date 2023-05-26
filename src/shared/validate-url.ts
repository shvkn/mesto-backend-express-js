import isURL from 'validator/lib/isURL';
import { ValidationMessages } from './constants';

const validateUrl = (value: string) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error(ValidationMessages.URL);
  }
  return value;
};

export default validateUrl;
