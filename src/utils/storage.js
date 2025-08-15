const STORAGE_KEY = 'credenciales';

export function getUserCredenciales() {
  try {
    const credencialesStr = window.localStorage.getItem(STORAGE_KEY);

    // Si no hay datos, devolver arreglo con objeto vacío
    if (!credencialesStr) return [{}];

    const parsed = JSON.parse(credencialesStr);

    // Si no es arreglo, lo convertimos a arreglo
    if (!Array.isArray(parsed)) return [{}];

    // Si el arreglo está vacío, devolvemos arreglo con objeto vacío
    if (parsed.length === 0) return [{}];

    // Si pasa todas las validaciones, devolver los datos tal cual
    return parsed;
  } catch {
    // Si hay error de parseo u otro, devolvemos arreglo con objeto vacío
    return [{}];
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