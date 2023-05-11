import {View,Text,StyleSheet,Image, Pressable} from 'react-native'
import React from 'react'
import useAuth from '../context/auth/useAuth'

const SingleCategory = ({headerText,quantity,image,direction}) => {
    const {navigation} = useAuth()
    return (
        <Pressable style={[styles.wholeContainer,{flexDirection: direction}]} onPress={()=> navigation.navigate('category') }>
            <View>
                <Text style={styles.headerText}>{headerText}</Text>
                <Text style={styles.quantity}>{quantity} Product</Text>
            </View>
            <Image source={image} resizeMode='cover' style={styles.imageStyles} />
        </Pressable>
    )
}

export default SingleCategory

const styles = StyleSheet.create({
    wholeContainer: {
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'space-around',
        maxHeight: 100,
        //paddingVertical: 20,
        marginBottom: 40,
        borderRadius: 30
    },
    headerText: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
        fontSize: 24
    },
    quantity: {
        fontFamily: 'Poppins-Regualar',
        fontSize: 16
    },
    imageStyles: {
        width: 150,
        height: 100,
        
        borderRadius: 30
    }
})