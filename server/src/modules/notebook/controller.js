import { Theme, Tab } from './model.js';

export const getThemes = async (req, res, next) => {
  try {
    const userId = req.user?.userId; // Si hay auth en el futuro
    const query = userId ? { userId } : {}; // Si no hay auth, traerá todo (modo desarrollo)
    
    const themes = await Theme.find(query).lean();
    
    // Para cada theme, buscar sus tabs
    const themesWithTabs = await Promise.all(
      themes.map(async (theme) => {
        const tabs = await Tab.find({ themeId: theme._id }).lean();
        return {
          id: theme._id,
          name: theme.name,
          tabs: tabs.map(tab => ({
            id: tab._id,
            name: tab.name,
            content: tab.content
          }))
        };
      })
    );
    
    res.json({ success: true, data: themesWithTabs });
  } catch (error) {
    next(error);
  }
};

export const createTheme = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user?.userId;
    
    const newTheme = await Theme.create({ name, userId });
    
    // Crear una pestaña (tab) por defecto
    const defaultTab = await Tab.create({
      themeId: newTheme._id,
      name: 'Nueva nota',
      content: '<h2>Nueva nota</h2><p>Comienza a escribir aquí...</p>'
    });

    res.status(201).json({
      success: true,
      data: {
        id: newTheme._id,
        name: newTheme.name,
        tabs: [{
          id: defaultTab._id,
          name: defaultTab.name,
          content: defaultTab.content
        }]
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createTab = async (req, res, next) => {
  try {
    const { themeId } = req.params;
    const { name } = req.body;
    
    const newTab = await Tab.create({
      themeId,
      name: name || 'Sin título',
      content: ''
    });

    res.status(201).json({
      success: true,
      data: {
        id: newTab._id,
        name: newTab.name,
        content: newTab.content
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateTab = async (req, res, next) => {
  try {
    const { tabId } = req.params;
    const { name, content } = req.body;
    
    const updatedTab = await Tab.findByIdAndUpdate(
      tabId,
      { $set: { name, content } },
      { new: true }
    );

    res.json({ success: true, data: updatedTab });
  } catch (error) {
    next(error);
  }
};

export const updateTheme = async (req, res, next) => {
  try {
    const { themeId } = req.params;
    const { name } = req.body;
    const updatedTheme = await Theme.findByIdAndUpdate(themeId, { $set: { name } }, { new: true });
    res.json({ success: true, data: updatedTheme });
  } catch (error) {
    next(error);
  }
};

export const deleteTheme = async (req, res, next) => {
  try {
    const { themeId } = req.params;
    await Theme.findByIdAndDelete(themeId);
    await Tab.deleteMany({ themeId });
    res.json({ success: true, message: 'Tema eliminado' });
  } catch (error) {
    next(error);
  }
};

export const deleteTab = async (req, res, next) => {
  try {
    const { tabId } = req.params;
    await Tab.findByIdAndDelete(tabId);
    res.json({ success: true, message: 'Pestaña eliminada' });
  } catch (error) {
    next(error);
  }
};
