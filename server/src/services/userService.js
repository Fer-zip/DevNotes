/**
 * Servicio de usuarios.
 * Contiene la lógica de negocio pura.
 */
export const fetchUsers = async () => {
  // Aquí iría la lógica compleja o llamadas a Base de Datos
  return [
    { id: 1, name: 'Antigravity User', role: 'Developer' },
    { id: 2, name: 'Jean', role: 'Admin' }
  ];
};
