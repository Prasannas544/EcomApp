import {useNavigation} from '@react-navigation/native';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // GoogleAuthProvider,
  // signInWithPopup,
} from "firebase/auth"
import { auth } from '../../firebase/firebase';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(false);
  //const [email, setEmail] = useState('mishratapas769@gmail.com');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser("")
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleEmailandPasswordCheck=()=> {
    if(email.length == 0 && password.length == 0){
      return true
    }
    return false
  }

  const handleNewUser= async()=> {

    let check = handleEmailandPasswordCheck()
    if(check){
      alert('Kindly enter details')
      return
    }

    if(password !== confirmPassword){
      alert('Password does not match')
      return
    }
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      console.log('user_created')
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  const handleLogin= async()=> {
    let check = handleEmailandPasswordCheck()
    if(check){
      alert('Kindly enter details')
      return
    }
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setLoading(false)
    } catch (err) {
      setError(null)
      setError(err)
      setLoading(false)
      console.log('error_is', error)
    }
    console.log('user_is', user)
  }

  const handleLogout= async()=> {
    try {
      setLoading(true)
      await signOut(auth)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setLoading(false)
      navigation.replace("login")
    } catch (err) {
      console.log(err)
    }
  }

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
      handleNewUser,
      handleLogin,
      handleLogout,
      handleEmailandPasswordCheck,
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
