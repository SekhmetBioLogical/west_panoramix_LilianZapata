/**
 * funciones para validar formatos de datos.
 */

// valido que el correo tenga un formato correcto
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// valido que el codigo de verificacion tenga 6 digitos numericos
export const validateVerificationCode = (code) => {
  return /^\d{6}$/.test(code);
};