import {Text, Pressable, StyleSheet, Image} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const GoogleButton = () => {
    return (
        <Pressable style={styles.container}>
            {/*<FontAwesome name='google' size={18} color='#000000' />*/}
            <Image source={require('../assets/google.png')} style={{width: 19, height: 16}} />
            <Text style={styles.textStyle}>continue with Google</Text>
        </Pressable>
    )
}

export default GoogleButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 20,
    },
    textStyle: {
        textAlign: 'center',
        color: '#666666',
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    }
})