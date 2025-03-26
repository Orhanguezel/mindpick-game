export const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };
  
  export const setStoredUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  