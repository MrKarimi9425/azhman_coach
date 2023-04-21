import React from "react";
import { Dimensions, Image, StyleSheet, useWindowDimensions, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { Ads } from "../../Common";
const Width = Dimensions.get('window').width;

const Banner = () => {
    const { width, height } = useWindowDimensions();

    return (
        <Carousel
            data={Ads}
            autoplay={true}
            containerCustomStyle={{ marginTop: 40, }}
            style={{}}
            loop={true}
            autoplayDelay={10000}
            layout={'default'}
            renderItem={({ item, index }) => {
                return (
                    <Image key={index} resizeMode="contain"
                        resizeMethod="resize"
                        source={item.image} style={styles.image} />
                )
            }}
            sliderWidth={width}
            itemWidth={width}
        />
    )
}

export { Banner }

const styles = StyleSheet.create({
    image: {
        width: '95%',
        height: Width / 2,
        borderRadius: 15,
        alignSelf: 'center'
    },
})
