import { useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../services/authService";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  
    useEffect(() => {
      const token = getToken();
      setIsAuthenticated(!!token);
    }, []);
  
    return isAuthenticated;
  };
  
  export default useAuth;