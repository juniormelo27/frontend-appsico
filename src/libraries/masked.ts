function maskedCPF(value?: string | null): string {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
    .slice(0, 14);
}

function maskedName(name?: string | undefined | null): string {
  if (!name) return '';

  if (!name || name === ' ') {
    return '';
  }

  const trimmedName = maskedOnlyLetters(name)
    .trimStart()
    .replace(/\s{2,}/g, '');

  if (!trimmedName) {
    return '';
  }

  const words = trimmedName.toLowerCase().split(' ');

  words[0] = words[0][0]?.toUpperCase() + words[0]?.slice(1);

  for (let i = 1; i < words.length; i++) {
    if (!['de', 'da', 'do', 'dos'].includes(words[i])) {
      words[i] = words[i][0]
        ? words[i][0]?.toUpperCase() + words[i]?.slice(1)
        : '';
    }
  }

  return words?.join(' ')?.replaceAll('.', '')?.replaceAll('. ', '');
}

function maskedEmail(value?: string): string {
  if (!value) return '';

  return value
    ?.replace(/[^a-zA-Z0-9.@-_-\s]/g, '')
    .trim()
    .toLowerCase();
}

function maskedCNPJ(value?: string | null | undefined) {
  if (!value) return '';

  return value
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .replaceAll('/', '')
    .replaceAll('.', '')
    .slice(0, 14)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

const maskedMoney = (value: string | number): string => {
  value = String(value).replace(/\D/g, '');
  value = String(value).replace(/(\d)(\d{2})$/, '$1,$2');
  value = String(value).replace(/(?=(\d{3})+(\D))\B/g, '.');

  return String(value).length === 0 ? '' : 'R$ ' + value;
};

function maskedPhone(value?: string): string {
  if (!value) return '';

  return value
    ?.replace(/\D/g, '')
    ?.slice(0, 11)
    ?.replace(/(\d{2})(\d)/, '($1) $2')
    ?.replace(/(\d{5})(\d{4})/g, '$1-$2');
}

function maskedZipCode(value?: string): string {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
}

function maskedDate(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');
}

function maskedHour(value: string): string {
  const numericValue = value.replace(/\D/g, '');

  return numericValue.replace(/(\d{2})(\d)/, '$1:$2').slice(0, 5);
}

function maskedOnlyLetters(value: string) {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
}

function maskedOnlyNumbers(value?: string): string {
  return value?.replace(/\D/g, '') ?? '';
}

//06/123.456
function maskedCRP(value?: string) {
  if (!value) return '';
  
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1');
}

export const masked = {
  cpf: maskedCPF,
  cnpj: maskedCNPJ,
  name: maskedName,
  email: maskedEmail,
  money: maskedMoney,
  letter: maskedOnlyLetters,
  number: maskedOnlyNumbers,
  phone: maskedPhone,
  zip_code: maskedZipCode,
  date: maskedDate,
  hour: maskedHour,
  crp: maskedCRP,
};

export default masked;
