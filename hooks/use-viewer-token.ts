import { create } from "zustand";
import { useEffect } from "react";
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

interface TokenState {
  token: string;
  name: string;
  identity: string;
  setToken: (token: string) => void;
  setName: (name: string) => void;
  setIdentity: (identity: string) => void;
}

const useTokenStore = create<TokenState>((set) => ({
  token: "",
  name: "",
  identity: "",
  setToken: (token: string) => set(() => ({ token })),
  setName: (name: string) => set(() => ({ name })),
  setIdentity: (identity: string) => set(() => ({ identity })),
}));

interface ViewerTokenHook {
  token: string;
  name: string;
  identity: string;
}

export const useViewerToken = (hostIdentity: string): ViewerTokenHook => {
  const { token, name, identity, setToken, setName, setIdentity } =
    useTokenStore();

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode<JwtPayload & { name?: string }>(
          viewerToken
        );

        if (decodedToken.name) {
          setName(decodedToken.name);
        }

        if (decodedToken.jti) {
          setIdentity(decodedToken.jti);
        }
      } catch {
        toast.error("Failed to create token");
      }
    };

    createToken();
  }, [hostIdentity, setToken, setName, setIdentity]);

  return {
    token,
    name,
    identity,
  };
};
