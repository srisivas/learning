import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import he from 'he';
import Divider from '../../Components/Helper/Divider';
import {useNavigation} from '@react-navigation/native';

const AlbumDetails = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;

  // Decide which ID to use for the API call

  const [album, setAlbum] = useState(null);
  const SAAVN_ALBUM_API = `https://saavn.me/albums?id=${id}`;

  useEffect(() => {
    fetch(SAAVN_ALBUM_API)
      .then(response => response.json())
      .then(data => {
        setAlbum(data.data);
        console.log('data.data', data.data.songs[0].duration);
        console.log('data.data', data.data.songs[0].downloadUrl);
      })
      .catch(error => {
        console.error('Error fetching album:', error);
      });
  }, [id]);

  if (!album) {
    return <Text>Loading...</Text>;
  }

  const renderSong = ({item}) => (
    <View style={styles.songContainer}>
      <View style={{width: '90%'}}>
        <Text style={styles.songTitle}>{he.decode(item.name)}</Text>
        <Text style={styles.songArtist}>{item.primaryArtists}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Songplay', {
            name: item.name,

            downloadUrl: item.downloadUrl[3],
            image: item.image[2],
          });
        }}
        style={{
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 40,
            height: 40,
          }}
          source={require('../../Components/assets/Images/play.png')}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#BD2D35', '#70252A', '#000000', '#B05D61']}
      style={styles.container}>
      <Image source={{uri: album.image[2].link}} style={styles.albumImage} />
      <Text style={styles.albumTitle}>{he.decode(album.name)}</Text>
      <Text style={styles.text}>Year: {album.year}</Text>
      <Text style={styles.text}>Release Date: {album.releaseDate}</Text>
      <Text style={styles.text}>Artist: {album.primaryArtists}</Text>
      <Text style={styles.text}>duration: {album.songs[0].duration}</Text>

      <Divider />

      <FlatList
        data={album.songs}
        renderItem={renderSong}
        keyExtractor={song => song.id}
        style={styles.songList}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  albumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
    width: '80%',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  songContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
    width: '100%',
  },
  songArtist: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    width: '80%',
  },
  songList: {
    width: '100%',
    marginTop: 10,
  },
});

export default AlbumDetails;
