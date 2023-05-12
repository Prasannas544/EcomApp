import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import useAuth from '../../context/auth/useAuth';
import {getProductDetail} from '../../services/dataSlice';
import Header from '../../components/Header';

const ProductDetail = props => {
  const {loading, singleItemDetail} = useSelector(state => state.data);

  const {dispatch} = useAuth();

  let id = props.route.params.productID;
  console.log('id_is', id);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  console.log('singleItemDetail', singleItemDetail);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
          <StatusBar
            animated={true}
            backgroundColor={'#FFFFFF'}
            barStyle={'dark-content'}
          />
          <View style={styles.pageContainer}>
            <View style={styles.imageAndHeaderContainer}>
              <Header />
              {singleItemDetail && (
                <View style={styles.carouselContainer}>
                  <Image
                    source={{uri: singleItemDetail.image}}
                    style={{width: 250, height: 150, resizeMode: 'contain'}}
                  />
                  <Text style={{color: '#000'}}>{singleItemDetail.title}</Text>
                </View>
              )}
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.priceContainer}>Price here</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  pageContainer: {
    position: 'relative',
  },
  imageAndHeaderContainer: {
    paddingHorizontal: 10,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  priceContainer: {
    color: '#FFF',
  },
});
