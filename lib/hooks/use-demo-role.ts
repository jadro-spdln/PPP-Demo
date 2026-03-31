"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type DemoRole = "partner" | "admin";

const STORAGE_KEY = "ppp-demo-role";

function getStoredRole(): DemoRole {
  if (typeof window === "undefined") {
    return "partner";
  }

  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "admin" ? "admin" : "partner";
}

export function useDemoRole() {
  const [role, setRoleState] = useState<DemoRole>("partner");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const nextRole = getStoredRole();
    setRoleState(nextRole);
    setIsReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      setRoleState(event.newValue === "admin" ? "admin" : "partner");
    };

    const handleRoleChange = (event: Event) => {
      const customEvent = event as CustomEvent<DemoRole>;
      const next = customEvent.detail === "admin" ? "admin" : "partner";
      setRoleState(next);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("ppp-demo-role-change", handleRoleChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("ppp-demo-role-change", handleRoleChange as EventListener);
    };
  }, []);

  const setRole = useCallback((nextRole: DemoRole) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextRole);
      window.dispatchEvent(new CustomEvent<DemoRole>("ppp-demo-role-change", { detail: nextRole }));
    }

    setRoleState(nextRole);
  }, []);

  const toggleRole = useCallback(() => {
    setRole(role === "admin" ? "partner" : "admin");
  }, [role, setRole]);

  return useMemo(
    () => ({
      role,
      isReady,
      isAdmin: role === "admin",
      isPartner: role === "partner",
      setRole,
      toggleRole,
    }),
    [isReady, role, setRole, toggleRole],
  );
}