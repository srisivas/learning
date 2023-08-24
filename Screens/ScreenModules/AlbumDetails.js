import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import he from 'he';

const AlbumDetails = ({route}) => {
  const {id} = route.params;
  if (id === '0' || !id) {
    return null;
  }
  const [album, setAlbum] = useState(null);
  const SAAVN_ALBUM_API = `https://saavn.me/albums?id=${id}`;

  useEffect(() => {
    fetch(SAAVN_ALBUM_API)
      .then(response => response.json())
      .then(data => {
        setAlbum(data.data);
        console.log('songssss', data.data);
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
      <Text numberOfLines={1} style={styles.songTitle}>
        {he.decode(item.name)}
      </Text>
      <Text style={styles.songArtist}>{item.primaryArtists}</Text>
      <Text style={styles.songArtist}>{item.duration}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#BD2D35', '#70252A', '#000000', '#B05D61']}
      style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          maxWidth: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: album.image[2].link}}
            style={styles.albumImage}
          />
        </View>
        <View style={{}}>
          <Text style={styles.albumTitle}>{he.decode(album.name)}</Text>
          <Text style={styles.text}>Year: {album.year}</Text>
          <Text style={styles.text}>Release Date: {album.releaseDate}</Text>
          <Text style={styles.text}>Artist: {album.primaryArtists}</Text>
          <Text style={styles.text}>duration: {album.duration}</Text>
        </View>
      </View>
      {/* <Text style={styles.text}>duration: {album.duration}</Text> */}

      <FlatList
        data={album.songs}
        renderItem={renderSong}
        keyExtractor={song => song.id}
        style={styles.songList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginBottom: 20,

    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  albumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',

    width: 219,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    width: 219,
  },
  songContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  songTitle: {
    fontSize: 18,
    color: 'white',
  },
  songArtist: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  songList: {
    width: '100%',
    marginTop: 10,
  },
});

export default AlbumDetails;
