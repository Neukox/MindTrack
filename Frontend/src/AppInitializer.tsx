import { useEffect } from "react";
import useAuthStore from "./features/auth/store/auth.store";
import api from "./lib/api/axios";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const verifySession = async () => {
      setLoading(true);

      try {
        const response = await api.post(
          "/auth/refresh",
          {},
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );
        const newToken = response.data.accessToken;

        if (mounted) login(newToken);
      } catch {
        if (mounted) logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();

    return () => {
      controller.abort();
      mounted = false;
    };
  }, [login, logout, setLoading]);

  return children;
}
