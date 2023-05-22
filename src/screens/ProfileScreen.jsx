import { View, Text, StyleSheet, ScrollView, StatusBar, Button, Pressable } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Entypo from 'react-native-vector-icons/Entypo'
import useAuth from '../context/auth/useAuth'
import useTheme from '../context/theme/useTheme'

const ProfileScreen = () => {
  const {handleLogout, navigation} = useAuth();
  const {handleThemeChange, currentTheme, lightTheme, blackTheme} = useTheme()

  console.log('theme_is', currentTheme)

  return (
    <View style={{flex: 1, backgroundColor: currentTheme.backgroundColor}}>
     <ScrollView style={{...styles.wholeContainer}}>
     <StatusBar
          animated={true}
          backgroundColor={'#FFFFFF'}
          barStyle={'dark-content'}
        />
          {/*<Header goto={()=> navigation.goBack(null)} />*/}
          <View style={{...styles.avatarContainer, backgroundColor: currentTheme.backgroundColor}}>
            <Entypo name='add-user' color='#000' size={48} />
          </View>
          <Button onPress={() => handleLogout(0)} title="Log out" />
          <View style={{marginTop: 20}}>
          <Button onPress={()=> handleThemeChange(blackTheme)} title='Black Theme' />
          <Button onPress={()=> handleThemeChange(lightTheme)} title='light Theme' />
          </View>
     </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  wholeContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})