import { ErrorPassword } from '@/@types';

import masked from './masked';

function isCNPJ(value?: string): boolean {
  if (!value) return false;

  value = value.replace(/[^\d]+/g, '');

  if (value.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(value)) {
    return false;
  }

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(value.charAt(i)) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }
  let verificationDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(value.charAt(12)) !== verificationDigit) {
    return false;
  }

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(value.charAt(i)) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }
  verificationDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(value.charAt(13)) !== verificationDigit) {
    return false;
  }

  return true;
}

function isCPF(value?: string): boolean {
  if (!value) return false;

  value = masked.number(value);
  if (value == '') return false;
  if (
    value.length != 11 ||
    value == '00000000000' ||
    value == '11111111111' ||
    value == '22222222222' ||
    value == '33333333333' ||
    value == '44444444444' ||
    value == '55555555555' ||
    value == '66666666666' ||
    value == '77777777777' ||
    value == '88888888888' ||
    value == '99999999999'
  )
    return false;

  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(value.charAt(i)) * (10 - i);

  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(value.charAt(9))) return false;

  add = 0;

  for (let i = 0; i < 10; i++) add += parseInt(value.charAt(i)) * (11 - i);

  rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(value.charAt(10))) return false;

  return true;
}

function isDate(value?: string): boolean {
  if (!value) return false;

  const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const matches = value.match(pattern);

  if (!matches) {
    return false;
  }

  return true;
}

function isHour(value?: string): boolean {
  if (!value) return false;

  const pattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  const matches = value.match(pattern);

  if (!matches) {
    return false;
  }

  return true;
}

function isBirth(value?: string): boolean {
  if (!value) return false;

  const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const matches = value.match(pattern);

  if (!matches) {
    return false;
  }

  const day = parseInt(matches[1], 10);
  const month = parseInt(matches[2], 10);
  const year = parseInt(matches[3], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  const inputDate = new Date(year, month - 1, day);
  if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() !== month - 1 ||
    inputDate.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return inputDate <= minAgeDate;
}

function isEmail(value: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(value);
}

function isName(value: string): boolean {
  if (!value) return false;

  value = value?.trim();

  if (value.indexOf(' ') === -1) {
    return false;
  }

  const partsName = value.split(' ');

  if (partsName.length < 1) {
    return false;
  }

  return true;
}

function isPhone(value?: string): boolean {
  if (!value) return false;

  const regex = /^\d{4}9\d{8,9}$/;

  const phone = masked
    .number(
      value.slice(0, 2) === '55' && value.length === 13
        ? value.slice(3, value.length)
        : value
    )
    .padStart(13, '55');

  return regex.test(phone);
}

function isZipCode(value: string): boolean {
  return value.replaceAll('-', '').replaceAll('.', '').length === 8;
}

function isPassword(value?: string): {
  score: number;
  message: Array<ErrorPassword>;
} {
  let score = 0;
  const message: Array<ErrorPassword> = [];

  if (!value) {
    message.push('empty');

    return {
      score,
      message,
    };
  }

  if (value.length >= 6) {
    score += 10;
  } else {
    message.push('small');
  }

  if (value.match(/[A-Z]/)) {
    score += 20;
  } else {
    message.push('uppercase');
  }

  if (value.match(/[a-z]/)) {
    score += 20;
  } else {
    message.push('lowercase');
  }

  if (value.match(/\d/)) {
    score += 10;
  } else {
    message.push('numeric');
  }

  if (value.length >= 6 && value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) {
    score += 40;
  } else {
    message.push('special');
  }

  return { score, message };
}

export const errorsPassword: Record<ErrorPassword, string> = {
  empty: 'Preenha a senha',
  small: 'A senha deve conter pelo menos 6 caracteres.',
  uppercase: 'A senha deve conter pelo menos uma letra maiúscula.',
  lowercase: 'A senha deve conter pelo menos uma letra minúscula.',
  numeric: 'A senha deve conter pelo menos um número.',
  special: 'A senha deve conter pelo menos um caractere especial.',
};

export function translatePasswordError(value: ErrorPassword) {
  return errorsPassword[value];
}

export const validated = {
  cpf: isCPF,
  cnpj: isCNPJ,
  date: isDate,
  hour: isHour,
  birth: isBirth,
  email: isEmail,
  name: isName,
  phone: isPhone,
  zip_code: isZipCode,
  password: isPassword,
  translatePassword: translatePasswordError,
};

export default validated;
