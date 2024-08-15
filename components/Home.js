import * as React from "react";
import { Image, StyleSheet, Text, View, StatusBar, Pressable, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handlePress = (buttonText) => {
    navigation.navigate('Card', { text: buttonText });
  };

  return (
    <View style={styles.leftAreaFlexBox}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ImageBackground style={[styles.rickmortyIcon, styles.spacePosition]} resizeMode="cover" source={require('@/assets/images/space.png')} />
      <Image style={styles.image216Icon} resizeMode="cover" source={require('@/assets/images/rickandmorty.png')} />
      <Text style={[styles.welcomeToOur, styles.exploreNowTypo]}>Welcome to Our App</Text>
      <Text style={[styles.inThisApp, styles.inThisAppTypo]}>In this app you can see the details about the characters of Rick and Morty series!</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.exploreNowWrapper} onPress={() => handlePress('character')}>
          <Text style={[ styles.inThisAppTypo]}>Characters</Text>
        </Pressable>
        <Pressable style={styles.exploreNowWrapper} onPress={() => handlePress('location')}>
          <Text style={[ styles.inThisAppTypo]}>Location</Text>
        </Pressable>
        <Pressable style={styles.exploreNowWrapper} onPress={() => handlePress('episode')}>
          <Text style={[ styles.inThisAppTypo]}>Episode</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftAreaFlexBox: {
    flex: 1,
    backgroundColor: "black",
    // padding: 16,
  },
  spacePosition: {
    top: 0,
    position: "absolute",
  },
  exploreNowTypo: {
    fontWeight: "600",
  },
  inThisAppTypo: {
    letterSpacing: -0.6,
    fontSize: 16,
    textAlign: "left",
    color: "#fff",
  },
  rickmortyIcon: {
    width: "100%",
    height: "100%",
  },
  image216Icon: {
    bottom: 0,
    width: "100%",
    height: "40%",
    position: "absolute",
    right: "2%"
  },
  welcomeToOur: {
    top: "5%",
    fontSize: 24,
    letterSpacing: -1,
    marginLeft: -171,
    left: "50%",
    position: "absolute",
    textAlign: "left",
    color: "#fff",
  },
  inThisApp: {
    top: "10%",
    width: 342,
    marginLeft: -171,
    left: "50%",
    position: "absolute",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between", 
    alignItems: "center",
    marginTop: "45%",
    width: "90%",
    alignSelf: "center"
  },
  exploreNowWrapper: {
    shadowColor: "rgba(247, 247, 165, 0.51)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    borderRadius: 12,
    backgroundColor: "#399237",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: "100%", 
  },
});

export default Home;




