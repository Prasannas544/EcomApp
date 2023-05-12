import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel'

const CustomCarousel = ({image, count}) => {

    const width = Dimensions.get('window').width;

    const images = Array(count).fill(images);
  return (
    <View style={{ flex: 1 }}>
        <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={[images]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image source={{uri: index}} style={{width: 100, height: 100}} />
                    </View>
                )}
          />
    </View>
  )
}

export default CustomCarousel