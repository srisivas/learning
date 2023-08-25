import React, {useRef} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import he from 'he';

const Songplay = ({route}) => {
  const playerRef = useRef(null); // Create a reference to store the Video player

  // Extracting the parameters sent to this screen
  const {name, downloadUrl, image} = route.params;
  console.log('downloadUrl', downloadUrl);
  console.log('image', image);

  const togglePlayPause = () => {
    if (playerRef.current) {
      // Check if the player is paused, and then toggle
      if (playerRef.current.paused) {
        playerRef.current.play();
      }
    }
  };

  // Functions to handle video buffering and errors
  const onBuffer = buffer => {
    console.log('Buffering:', buffer);
  };

  const videoError = error => {
    console.error('Video error:', error);
  };

  return (
    <LinearGradient
      colors={['#BD2D35', '#70252A', '#000000', '#B05D61']}
      style={styles.container}>
      <Image
        source={{uri: image.link}}
        style={styles.albumImage}
        onError={error => console.log('Image Error:', error)}
      />

      <Text style={styles.songName}>{he.decode(name)}</Text>

      <Video
        source={{uri: downloadUrl.link}}
        ref={playerRef}
        audioOnly={true} // Ensure only audio is played
        playInBackground={true}
        playWhenInactive={true}
        resizeMode="none"
        style={{height: 0, width: 0}} // Hide the video view
        onBuffer={this.onBuffer}
        onError={this.videoError}
      />
      <TouchableOpacity onPress={togglePlayPause}>
        <Text style={styles.playButtonText}>Toggle Play/Pause</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  songImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  songName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButtonText: {
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  albumImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default Songplay;
