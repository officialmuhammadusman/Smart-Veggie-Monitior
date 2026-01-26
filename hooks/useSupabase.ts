import { alertsService } from "@/services/supabase/alerts";
import { authService } from "@/services/supabase/auth";
import { supabase } from "@/services/supabase/client";
import { devicesService } from "@/services/supabase/devices";
import { useEffect, useState } from "react";

export function useSupabase() {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check connection
    checkConnection();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkConnection = async () => {
    try {
      const session = await authService.getSession();
      setIsConnected(true);
      setUser(session?.user ?? null);
    } catch (error) {
      setIsConnected(false);
      console.error("Supabase connection error:", error);
    }
  };

  return {
    supabase,
    isConnected,
    user,
    auth: authService,
    devices: devicesService,
    alerts: alertsService,
  };
}
