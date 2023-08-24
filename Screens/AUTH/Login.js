import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  Platform,
  PanResponder,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Login = () => {
  const navigation = useNavigation();

  const [number, setNumber] = useState('');
  const [mask, setMask] = useState(true);
  const [password, setPassword] = useState('');
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;
  const [showIcon, setShowIcon] = useState(true);

  const handleSlideUp = () => {
    Animated.timing(slideUpAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowIcon(false); // Hide the icon after animation
    });
  };

  const handleSlideDown = () => {
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const {dy} = gestureState;
        return dy < -10; // Check if swipe is upwards
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dy} = gestureState;
        if (dy < -50) {
          handleSlideUp();
        } else {
          handleSlideDown();
        }
      },
    }),
  ).current;

  const slideUpStyle = {
    transform: [
      {
        translateY: imageAnim,
        translateY: slideUpAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  const handleJump = () => {
    // Handle jump action here
    Animated.sequence([
      Animated.timing(imageAnim, {
        toValue: -50,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const jumpInterval = setInterval(() => {
      handleJump();
    }, 2000); // Jump every 2 seconds

    return () => {
      clearInterval(jumpInterval);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imageContainer} {...panResponder.panHandlers}>
          <Image
            style={styles.image}
            source={require('../../Components/assets/Images/music5.jpeg')}
          />
          {showIcon && (
            <Animated.View
              style={[
                styles.iconContainer,
                {transform: [{translateY: imageAnim}]},
              ]}>
              <View style={{alignItems: 'center'}}>
                <FontAwesome name="angle-double-up" size={50} color="#FFB543" />
                <Text style={{color: 'yellow'}}>SWIPE UP</Text>
              </View>
            </Animated.View>
          )}
        </View>

        <Animated.View style={[styles.loginContainer, slideUpStyle]}>
          <View style={{bottom: 50, padding: 10}}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Enter your Mobile number"
              maxLength={10}
            />
          </View>

          <View style={{padding: 10, bottom: 50}}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Enter your password"
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              // Handle forgot password
            }}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          {/* Login Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#507c88',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(144, 196, 164, 0.7)',
    paddingVertical: 120,
    paddingHorizontal: 20,
    color: 'white',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  forgotText: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
