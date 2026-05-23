export type AuthUser = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    accessToken: string;
    refreshToken: string;
};

// Interfaz del Contexto
export type AuthContextValue = {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    authError: string | null;
    login: (username: string, password: string, remember: boolean) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
};