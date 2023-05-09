import {useNavigation} from '@react-navigation/native';
import {createContext, useContext, useMemo, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const navigation = useNavigation();

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      navigation,
      email,
      setEmail,
      confirmPassword,
      setConfirmPassword,
      password,
      setPassword,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
