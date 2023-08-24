import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Album from './ScreenModules/Album';
import Playlist from './ScreenModules/Playlist';
import Charts from './ScreenModules/Charts';
import TrendingSongs from './ScreenModules/Trending';

const HomeScreen = props => {
  const [greeting, setGreeting] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'https://saavn.me/modules?language=english,tamil,hindi';

  useEffect(() => {
    const currentTime = new Date().getHours();
    let greeting = '';
    if (currentTime < 12) {
      greeting = 'Good Morning';
    } else if (currentTime < 18) {
      greeting = 'Good Afternoon';
    } else if (currentTime < 24) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Good Night';
    }
    setGreeting(greeting);
  }, []);

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://saavn.me/search/songs?query=${searchText}&page=1&limit=2`,
      );
      setSearchResults(response.data.data.topQuery.results);
    } catch (error) {
      console.log('Search Error:', error);
    }

    setLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <ScrollView>
      <LinearGradient
        colors={['#BD2D35', '#70252A', '#000000', '#B05D61']}
        style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{greeting}</Text>
          <Ionicons name="notifications-outline" size={25} color={'white'} />
        </View>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="white"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="white"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        {loading ? (
          <Text style={styles.text}>Loading...</Text>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={({item}) => (
              <View style={styles.searchItem}>
                <Image
                  source={{
                    uri: item.image.find(img => img.quality === '150x150').link,
                  }}
                  style={styles.searchItemImage}
                />
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
        <View style={styles.contentContainer}>
          <Album data={data} />
          <Playlist data={data} />
          <Charts data={data} />
          <TrendingSongs data={data} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#70252A',
    borderRadius: 5,
  },
  searchItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
