// frontend/src/utils/validation.js

export const validateEmail = (email) => {
  // Regex estandar para formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEvent = (data) => {
  if (!data || typeof data !== 'object') {
    return { isValid: false, message: "Los datos del evento no son válidos" };
  }

  // 1. nombre: solo letras y espacios 
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  if (!data.nombre || !nombreRegex.test(data.nombre.trim())) {
    return { isValid: false, message: "El nombre solo debe contener letras." };
  }

  // 2. solo formato correo
  if (!validateEmail(data.email)) {
    return { isValid: false, message: "El formato del email no es válido." };
  }

  // 3. direccion
  if (!data.direccion || data.direccion.trim().length < 5) {
    return { isValid: false, message: "La dirección debe tener al menos 5 caracteres." };
  }

  // 4. productora
  if (!data.productora || data.productora.trim().length === 0) {
    return { isValid: false, message: "La productora es obligatoria." };
  }

  // 5. validacion de fechas
  if (data.fechaInicio && data.fechaTermino) {
    const inicio = new Date(data.fechaInicio);
    const termino = new Date(data.fechaTermino);
    if (termino <= inicio) {
      return { isValid: false, message: "La fecha de término debe ser posterior a la de inicio." };
    }
  }

  return { isValid: true };
};