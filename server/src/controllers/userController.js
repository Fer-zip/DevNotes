import * as userService from '../services/userService.js';

/**
 * Controlador para obtener usuarios.
 * Maneja la entrada/salida HTTP.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
