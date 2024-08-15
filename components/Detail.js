import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {
  const { id, text } = route.params;
  const [detailData, setDetailData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/${text}/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetailData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetailData();
  }, [id]);

  if (!detailData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" size={"large"}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} resizeMode="cover" source={require('@/assets/images/space.png')}>
        <Pressable style={styles.miarrowUp} onPress={() => navigation.goBack()}>
          <Image style={styles.miarrowUpLayout} resizeMode="cover" source={require('@/assets/images/mi_arrow-up.png')} />
        </Pressable>

        {text === "character" && (
          <ScrollView contentContainerStyle={styles.scrollViewContent}showsVerticalScrollIndicator = {false} >
            <Image style={styles.image} resizeMode="cover" source={{ uri: detailData.image }} />
            <Text style={styles.title}>{detailData.name}</Text>
            <Text style={styles.text}>Status: {detailData.status}</Text>
            <Text style={styles.text}>Species: {detailData.species}</Text>
            <Text style={styles.text}>Gender: {detailData.gender}</Text>
            <Text style={styles.text}>Origin: {detailData.origin.name}</Text>
            <Text style={styles.text}>Location: {detailData.location.name}</Text>

            <Text style={styles.episodeTitle}>Episodes:</Text>
            {detailData.episode.map((episodeUrl, index) => (
              <Text key={index} style={styles.episodeText}>
                Episode: {episodeUrl.split('/').pop()}
              </Text>
            ))}
          </ScrollView>
        )}
        {text === "location" && (
          <View style={styles.scrollViewContent}>
            <Text style={styles.title}>{detailData.name}</Text>
            <Text style={styles.text}>Type: {detailData.type}</Text>
            <Text style={styles.text}>Dimension: {detailData.dimension}</Text>
            <Text style={styles.text}>Number of Residents: {detailData.residents.length}</Text>
          </View>
        )}

        {text === "episode" && (
          <View style={styles.scrollViewContent}>
            <Text style={styles.title}>{detailData.name}</Text>
            <Text style={styles.text}>Air Date: {detailData.air_date}</Text>
            <Text style={styles.text}>Episode: {detailData.episode}</Text>
            <Text style={styles.text}>Number of Characters: {detailData.characters.length}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get('window'); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000",
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    padding: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 0.8,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'left',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
    textAlign: 'left',
    
  },
  miarrowUp: {
    height: 24,
    width: 24,
    margin: 10,
  },
  miarrowUpLayout: {
    height: "100%",
    width: "100%",
    tintColor: "white",
  },
  episodeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
    marginBottom: 5,  
  },
  episodeText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
  },
});

export default Detail;
