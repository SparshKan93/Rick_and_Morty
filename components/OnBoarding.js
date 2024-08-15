import React from 'react';
import { StyleSheet, View, Image, ImageBackground, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnBoaring = () => {
    const navigation = useNavigation();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 4000);

        return () => clearTimeout(timer); 
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true} 
            />
            <ImageBackground
                style={styles.background}
                resizeMode="cover"
                source={require('@/assets/images/space.png')}
            >
                <View style={styles.overlay} />
                <View style={styles.centeredContainer}>
                    <Image
                        style={styles.centeredImage}
                        resizeMode="contain"
                        source={require('@/assets/images/logo.png')}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black", 
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
    },
    centeredImage: {
        width: 250,
        height: 250,
    },
});

export default OnBoaring;
