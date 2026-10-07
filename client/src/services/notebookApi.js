const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/notebook`;

export const getThemes = async () => {
  const res = await fetch(`${API_URL}/themes`);
  const data = await res.json();
  return data.data;
};

export const createTheme = async (name) => {
  const res = await fetch(`${API_URL}/themes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data.data;
};

export const updateTheme = async (themeId, name) => {
  const res = await fetch(`${API_URL}/themes/${themeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data.data;
};

export const deleteTheme = async (themeId) => {
  const res = await fetch(`${API_URL}/themes/${themeId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data.success;
};

export const createTab = async (themeId, name) => {
  const res = await fetch(`${API_URL}/themes/${themeId}/tabs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data.data;
};

export const updateTab = async (tabId, name, content) => {
  const res = await fetch(`${API_URL}/tabs/${tabId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, content }),
  });
  const data = await res.json();
  return data.data;
};

export const deleteTab = async (tabId) => {
  const res = await fetch(`${API_URL}/tabs/${tabId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data.success;
};
