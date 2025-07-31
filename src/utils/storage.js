const STORAGE_KEY = 'credenciales';

export function getUserCredenciales() {
  try {
    const credencialesStr = window.localStorage.getItem(STORAGE_KEY);
    if (!credencialesStr) return null;
    return JSON.parse(credencialesStr);
  } catch {
    return null;
  }
}

export function setUserCredenciales(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Puede manejar error
  }
}

export function clearUserCredenciales() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Puede manejar error
  }
}