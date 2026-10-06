/**
 * Servicio de Autenticación.
 * Aquí vive la lógica de cifrado, JWT y base de datos.
 */

export const authenticateUser = async (email, password) => {
  // Simulación de lógica de negocio
  if (email === 'admin@test.com' && password === '123456') {
    return { token: 'fake-jwt-token', user: { name: 'Admin', email } };
  }
  throw new Error('Credenciales inválidas');
};

export const createUser = async (userData) => {
  // Lógica para guardar en DB
  return { id: Date.now(), ...userData };
};
