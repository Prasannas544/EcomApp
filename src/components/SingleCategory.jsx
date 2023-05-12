import {View,Text,StyleSheet,Image, Pressable} from 'react-native'
import React, {useEffect} from 'react'
import useAuth from '../context/auth/useAuth'
import {useDispatch, useSelector} from 'react-redux'
import {getAllData, getCategoryData} from '../services/dataSlice'

const SingleCategory = ({headerText,quantity,image,direction, dataFor}) => {
    const {navigation} = useAuth()
    const dispatch = useDispatch()

    const handleClick= async ()=> {

        if(dataFor == 'all'){
            await dispatch(getAllData())
            navigation.navigate('category', {category_name: dataFor})
        } else {
            await dispatch(getCategoryData(dataFor))
            navigation.navigate('category', {category_name: dataFor})
        }
    }
    
    return (
        <Pressable 
            style={[styles.wholeContainer,{flexDirection: direction}]}
            onPress={handleClick}
        >
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
        borderRadius: 16
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