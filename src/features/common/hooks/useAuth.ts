export const useAuth = {
  access_token: localStorage.getItem("access_token"),
  signIn: (access_token: string) => {
    localStorage.setItem("access_token", access_token);
  },
  signOut: () => {
    localStorage.removeItem("access_token");
  },
};
