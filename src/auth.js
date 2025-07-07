import { jwtDecode } from 'jwt-decode';


export function getToken() {
  return localStorage.getItem('token');
}

export function getUserRole() {
  try {
    const token = getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getToken();
}
