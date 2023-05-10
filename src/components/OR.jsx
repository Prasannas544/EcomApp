import {View,Text,StyleSheet,Platform} from 'react-native'
import React from 'react'

const OR = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
            <Text style={styles.orStyles}>or</Text>
            <View style={styles.line1}></View>
        </View>
    )
}

export default OR

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 1,
    },
    line: {
        borderWidth: 0.2,
        borderWidthColor: '#b0b0b0',
        width: '45%',
    },
    line1: {
        borderWidth: 0.2,
        borderWidthColor: '#b0b0b0',
        width: '45%',
    },

    orStyles: {
        color: '#000',
        paddingHorizontal: 10,
    }
})