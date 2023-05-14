import {useNavigation} from '@react-navigation/native';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // GoogleAuthProvider,
  // signInWithPopup,
} from 'firebase/auth';
import {auth} from '../../firebase/firebase';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const showBottomBarNavigation = true;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser('');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleEmailandPasswordCheck = () => {
    if (email.length == 0 && password.length == 0) {
      return true;
    }
    return false;
  };

  const handleNewUser = async () => {
    // let check = handleEmailandPasswordCheck();
    // if (check) {
    //   alert('Kindly enter details');
    //   return;
    // }

    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await AsyncStorage.setItem('userToken', response._tokenResponse.localId);
      setLoading(false);
      setUser(true);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('check_here', response);
      await AsyncStorage.setItem('userToken', response._tokenResponse.localId);
      setLoading(false);
      setUser(true);
    } catch (err) {
      setError(null);
      setError(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      await AsyncStorage.removeItem('userToken');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      navigation.replace('login');
    } catch (err) {
      console.log(err);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      loading,
      navigation,
      dispatch,
      email,
      setEmail,
      confirmPassword,
      setConfirmPassword,
      password,
      setPassword,
      handleNewUser,
      handleLogin,
      handleLogout,
      handleEmailandPasswordCheck,
      showBottomBarNavigation,
    }),
    [user, loading, error, email],
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
