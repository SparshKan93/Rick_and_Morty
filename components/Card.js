import React, { useEffect, useState, useCallback } from 'react';
import { Text, StyleSheet, View, Image, Pressable, FlatList, ImageBackground, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Card = ({ route }) => {
  const { text } = route.params;
  const [results, setResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    species: '',
    gender: '',
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Temporary state variables for filters
  const [tempStatus, setTempStatus] = useState('');
  const [tempSpecies, setTempSpecies] = useState('');
  const [tempGender, setTempGender] = useState('');

  const navigation = useNavigation();

  // Fetch characters based on filters and pagination
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`https://rickandmortyapi.com/api/${text}?page=${page}&${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setResults(prevResults => {
          const uniqueResults = new Map(prevResults.map(item => [item.id, item]));
          data.results.forEach(item => uniqueResults.set(item.id, item));
          return Array.from(uniqueResults.values());
        });
        setHasNextPage(!!data.info.next);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error(error);
      setResults([]);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [text, filters, page]);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setResults([]);
      fetchCharacters();
      setTempStatus('');
      setTempSpecies('');
      setTempGender('');
    }, [text, filters])
  );

  const handleFilterApply = () => {
    setFilters({
      status: tempStatus,
      species: tempSpecies,
      gender: tempGender,
    });
    setModalVisible(false);
    setPage(1); 
    setResults([]); 
    setLoading(true); 
  };

  const renderItem = ({ item }) => (
    <Pressable key={item.id} style={styles.card} onPress={() => navigation.navigate('Detail', { id: item.id, text })}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: item.image }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.species}>{item.species}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.search}>
      <ImageBackground style={styles.image219Icon} resizeMode="cover" source={require('@/assets/images/space.png')}>
        <View style={styles.searchParentFlexBox}>
          <Pressable style={styles.miarrowUp} onPress={() => navigation.navigate('Home')}>
            <Image style={styles.miarrowUpLayout} resizeMode="cover" source={require('@/assets/images/mi_arrow-up.png')} />
          </Pressable>
          <View style={styles.filterContainer}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={styles.title}>Filter</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.resultsContainer}>
          {loading && page === 1 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : results.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No Results Found</Text>
            </View>
          ) : (
            <FlatList
              data={results}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()} 
              onEndReached={() => {
                if (!loading && hasNextPage) {
                  setPage(prevPage => prevPage + 1);
                }
              }}
              onEndReachedThreshold={0.1} 
              ListFooterComponent={loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              ) : null}
            />
          )}
        </View>
      </ImageBackground>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Filter Options</Text>

            {/* Status Filter */}
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Status:</Text>
              <View style={styles.customPicker}>
                <TouchableOpacity
                  style={[styles.pickerItem, tempStatus === '' && styles.selectedPickerItem]}
                  onPress={() => setTempStatus('')}
                >
                  <Text style={styles.pickerItemText}>Any</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempStatus === 'alive' && styles.selectedPickerItem]}
                  onPress={() => setTempStatus('alive')}
                >
                  <Text style={styles.pickerItemText}>Alive</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempStatus === 'dead' && styles.selectedPickerItem]}
                  onPress={() => setTempStatus('dead')}
                >
                  <Text style={styles.pickerItemText}>Dead</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempStatus === 'unknown' && styles.selectedPickerItem]}
                  onPress={() => setTempStatus('unknown')}
                >
                  <Text style={styles.pickerItemText}>Unknown</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Species:</Text>
              <View style={styles.customPicker}>
                <TouchableOpacity
                  style={[styles.pickerItem, tempSpecies === '' && styles.selectedPickerItem]}
                  onPress={() => setTempSpecies('')}
                >
                  <Text style={styles.pickerItemText}>Any</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempSpecies === 'human' && styles.selectedPickerItem]}
                  onPress={() => setTempSpecies('human')}
                >
                  <Text style={styles.pickerItemText}>Human</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempSpecies === 'alien' && styles.selectedPickerItem]}
                  onPress={() => setTempSpecies('alien')}
                >
                  <Text style={styles.pickerItemText}>Alien</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Gender:</Text>
              <View style={styles.customPicker}>
                <TouchableOpacity
                  style={[styles.pickerItem, tempGender === '' && styles.selectedPickerItem]}
                  onPress={() => setTempGender('')}
                >
                  <Text style={styles.pickerItemText}>Any</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempGender === 'female' && styles.selectedPickerItem]}
                  onPress={() => setTempGender('female')}
                >
                  <Text style={styles.pickerItemText}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempGender === 'male' && styles.selectedPickerItem]}
                  onPress={() => setTempGender('male')}
                >
                  <Text style={styles.pickerItemText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempGender === 'genderless' && styles.selectedPickerItem]}
                  onPress={() => setTempGender('genderless')}
                >
                  <Text style={styles.pickerItemText}>Genderless</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerItem, tempGender === 'unknown' && styles.selectedPickerItem]}
                  onPress={() => setTempGender('unknown')}
                >
                  <Text style={styles.pickerItemText}>Unknown</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={handleFilterApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchParentFlexBox: {
    marginVertical: '2%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  miarrowUp: {
    height: 24,
    width: 24,
  },
  miarrowUpLayout: {
    height: '100%',
    width: '100%',
    tintColor: 'white',
  },
  search: {
    backgroundColor: '#000000',
    flex: 1,
    width: '100%',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  image219Icon: {
    width: '100%',
    height: '100%',
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noResultsText: {
    color: 'white',
    fontSize: 20,
  },
  species: {
    color: 'white',
  },
  filterContainer: {
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalContent: {
    backgroundColor: '#000', 
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white', 
  },
  customPicker: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  pickerItemText: {
    color: 'white',
  },
  selectedPickerItem: {
    backgroundColor: '#333', 
  },
  applyButton: {
    backgroundColor: '#399237',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontSize: 18,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Card;
