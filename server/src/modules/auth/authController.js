import * as authService from './authService.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.authenticateUser(email, password);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error); // Pasa el error al middleware global
  }
};

export const register = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await authService.createUser(userData);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};
