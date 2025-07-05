// ✅ Simple localStorage based login

export const isLoggedIn = () => {
  return localStorage.getItem("isAdmin") === "true";
};

export const login = () => {
  localStorage.setItem("isAdmin", "true");
};

export const logout = () => {
  localStorage.removeItem("isAdmin");
};
