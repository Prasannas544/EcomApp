import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useAuth from '../context/auth/useAuth';
import {handleItemTitle} from '../components/customFunctions'

const CategoryScreen = props => {
  const [dataToShow, setDataToShow] = useState([]);
  const [added, setAdded] = useState(false);

  const {allItems, categoryItems} = useSelector(state => state.data);
  const {navigation, dispatch} = useAuth();

  useEffect(() => {
    if (props.route.params.category_name === 'all') {
      setDataToShow(allItems);
    } else {
      setDataToShow(categoryItems);
    }
  }, []);

  const handleFav = () => {
    setAdded(!added);
  };

  const handleGoingToDetailPage = id => {
    navigation.navigate('productDetail', {productID: id});
  };

  const SingleContainer = ({item}) => {
    return (
      <Pressable
        style={styles.singleWholeContainer}
        onPress={() => handleGoingToDetailPage(item.id)}>
        <Pressable style={styles.heartContainer} onPress={handleFav}>
          {added ? (
            <AntDesign name="heart" size={22} color="#ff0000" />
          ) : (
            <AntDesign name="hearto" size={22} color="#000" />
          )}
        </Pressable>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={{width: 120, height: 100}}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.titlText}>{handleItemTitle(item.title)}</Text>
          <Text style={styles.categoryStyle}>{item.category}</Text>
          <Text style={[styles.titlText, {fontSize: 18}]}>₹{item.price}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.wholeContainer}>
      <StatusBar
        animated={true}
        backgroundColor={'#E5E5E5'}
        barStyle={'dark-content'}
      />
       <Header goto={()=> navigation.goBack(null)} />
      <Text style={styles.categoryTextStyle}>
        {props.route.params.category_name}
      </Text>
      <View>
        <FlatList
          data={dataToShow}
          renderItem={({item}) => <SingleContainer item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          vertical
          style={{height: '90%'}}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  wholeContainer: {
    paddingHorizontal: 20,
    position: 'relative',
    paddingBottom: 100,
  },
  heartContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  singleWholeContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  categoryTextStyle: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: 22,
  },
  imageContainer: {
    borderRadius: 20,
  },
  titlText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000',
    marginTop: 2,
    textAlign: 'center',
  },
  categoryStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#969696',
    fontSize: 12,
    textAlign: 'center',
  },
  imageStyles: {
    width: 200,
    height: 70,
  },
});
