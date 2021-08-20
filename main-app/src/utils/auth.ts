export const userInfo = {
  getToken: () => localStorage.getItem('TOKEN'),
  setToken: (token: string) => localStorage.setItem('TOKEN', token),
};
