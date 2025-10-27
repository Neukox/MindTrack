import { useEffect } from "react";
import useAuthStore from "./features/auth/store/auth.store";
import api from "./lib/api/api";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await api.post("/auth/refresh");
        const newToken = response.data.accessToken;
        
        console.log("Valid session found, logging in with new token.", useAuthStore.getState().token);

        login(newToken);
      } catch(error) {
        console.log("No valid session found:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [login, logout, setLoading]);

  return children;
}
