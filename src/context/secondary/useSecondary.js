import {createContext, useContext, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const SecondaryContext = createContext();

export const SecondaryProvider = ({children}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const showBottomBarNavigationn = true;
  const hideBottomBarNavigation = false;

  // const memoedValue = useMemo(
  //   () => ({
  //     navigation,
  //     dispatch,
  //     showBottomBarNavigationn,
  //     hideBottomBarNavigation,
  //   }),
  //   [],
  // );

  const values = [
    navigation,
    dispatch,
    showBottomBarNavigationn,
    hideBottomBarNavigation,
  ];
  return (
    <SecondaryContext.Provider value={values}>
      {children}
    </SecondaryContext.Provider>
  );
};

export default function useSecondary() {
  return useContext(SecondaryContext);
}
