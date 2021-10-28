import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  signInURL: string;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: User;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signInURL = `https://github.com/login/oauth/authorize?scope=user&client_id=a67bcf93bd6d8f963f92`;

  const signIn = useCallback(async (githubCode: string) => {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@DoWhile:token', token);

    setUser(user);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('@DoWhile:token');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@DoWhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then((response) => setUser(response.data));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInURL, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
