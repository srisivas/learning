import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
// const {data} = props;

const Playlist = ({data}) => {
  const [activeFilter, setActiveFilter] = useState('playlists');
  // console.log('data', data);

  const renderPlaylist = ({item}) => (
    <TouchableOpacity
      style={styles.albumContainer}
      onPress={() => {
        console.log('Pressed playlist:', item.name);
      }}>
      <Image source={{uri: item.image[2].link}} style={styles.albumImage} />
      <Text numberOfLines={2} style={styles.albumTitle}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          activeFilter === 'playlists' && styles.activeFilterButton,
        ]}
        onPress={() => setActiveFilter('playlists')}>
        <Text style={styles.filterButtonText}>Playlists</Text>
      </TouchableOpacity>
      {activeFilter === 'playlists' && data && data.playlists && (
        <FlatList
          data={data.playlists}
          renderItem={renderPlaylist}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Playlist;

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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,

    borderRadius: 5,
  },
  activeFilterButton: {},
  filterButtonText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,

    height: 200,
  },
  albumContainer: {
    width: 150,
    height: 250,
    marginRight: 10,
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  albumTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    width: '80%',
    alignSelf: 'center',
  },
});
