import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
  Pressable,
  Platform
} from 'react-native';
import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import useAuth from '../../context/auth/useAuth';
import {getProductDetail,removeDetail} from '../../services/dataSlice';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ProductDetail = props => {
  const [quantity, setQuantity] = useState(0)
  const {loading,singleItemDetail} = useSelector(state => state.data);

  const {dispatch} = useAuth();

  const id = props.route.params.productID;

  useEffect(() => {
    dispatch(getProductDetail(id));

    return () => {
      dispatch(removeDetail())
    }

  },[dispatch]);

  const handleAddToCart = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is a success toast',
      visibilityTime: 2000, // Duration to show the toast in milliseconds (optional)
    });
  };

  const handleItemTitle = str => {
    let result = '';
    let spaceCount = 0;
    for(let i = 0; i < str.length; i++) {
      if(str[i] === ' ') {
        spaceCount++;
        if(spaceCount === 2) {
          break;
        }
      }
      result += str[i];
    }
    return result;
  };

  const RenderStars = (rating) => {
    const stars = [];

    // Render full stars
    for (let i = 1; i <= 5; i++) {
      const starIcon = i <= rating ? 'star' : 'star-o';
      stars.push(
        <FontAwesome
          key={i}
          name={starIcon}
          size={16}
          color="#FFAC08"
          style={{marginRight: 3}}
        />
      );
    }

    return stars;
  };


  return (
    <>
      {singleItemDetail === null ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <ScrollView style={{flex: 1,backgroundColor: '#FFF'}}>
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
                      style={{width: 250,height: 200,resizeMode: 'center'}}
                    />
                  </View>
                )}
              </View>
              <View style={styles.productDetailContainer}>
                <View style={styles.titleAndQuantityContainer}>
                  <View>
                  <Text style={styles.titleTextStyles}>{handleItemTitle(singleItemDetail.title)}</Text>
                  <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>{singleItemDetail.category}</Text>
                  <View style={styles.ratingsContainer}>{RenderStars(4.9)}</View>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Pressable onPress={()=> setQuantity(quantity-1)}>
                      <Text style={styles.quantityTextStyles}>-</Text>
                    </Pressable>
                    <Text style={styles.quantityTextStyles}>{quantity}</Text>
                    <Pressable onPress={()=> setQuantity(quantity+1)}>
                      <Text style={styles.quantityTextStyles}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Text style={styles.priceContainer}>₹{singleItemDetail.price}</Text>
            <Pressable
              style={styles.addToCart}
              onPress={() => handleAddToCart()}>
              <Feather name="shopping-cart" size={16} color="#000" />
              <Text style={styles.addToCartText}> Add to Cart</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wholeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  pageContainer: {
    position: 'relative',
  },
  imageAndHeaderContainer: {
    paddingHorizontal: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTextStyle: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
  },
  addToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  addToCartText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  priceContainer: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  productDetailContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //backgroundColor: '#DDE1E2',
    backgroundColor: '#FFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 20,
  },
  titleTextStyles: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 16
  },
  titleAndQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5
  },
  quantityContainer: {
    borderRadius: 40,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 14,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  quantityTextStyles: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 16
  },
  ratingsContainer: {
    flexDirection: 'row',
  },
});
