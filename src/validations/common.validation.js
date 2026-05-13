// ========== VALIDATION FUNCTIONS ==========

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateCPF = (cpf) => {
  // Basic CPF format validation: XXX.XXX.XXX-XX
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
};

const validateDate = (date) => {
  // Basic date format validation: DD/MM/YYYY
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(date)) return false;

  const [day, month, year] = date.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};

const validatePhone = (phone) => {
  // Basic phone format validation: (XX) XXXXX-XXXX
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

const validateCEP = (cep) => {
  // Basic CEP format validation: XXXXX-XXX
  const cepRegex = /^\d{5}-\d{3}$/;
  return cepRegex.test(cep);
};

module.exports = {
  validateEmail,
  validateCPF,
  validateDate,
  validatePhone,
  validateCEP,

};

