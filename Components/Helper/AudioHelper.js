import React, {useEffect, useState} from 'react';
import {} from 'react-native';
import Sound from 'react-native-sound';

class AudioHelper {
  constructor() {
    this.sound = null;
  }

  load(url, callback) {
    if (this.sound) {
      this.sound.release();
    }
    this.sound = new Sound(url, '', error => {
      if (error) {
        console.error('Failed to load the sound', error);
        return callback(error);
      }
      callback(null);
    });
  }

  play(callback) {
    if (this.sound) {
      this.sound.play(success => {
        if (success) {
          callback(null);
        } else {
          callback('Playback failed due to audio decoding errors');
        }
      });
    }
  }

  pause() {
    this.sound && this.sound.pause();
  }

  release() {
    this.sound && this.sound.release();
    this.sound = null;
  }

  setCurrentTime(time) {
    this.sound && this.sound.setCurrentTime(time);
  }

  getDuration() {
    if (this.sound) {
      return this.sound.getDuration();
    }
    return 0;
  }

  setVolume(volume) {
    this.sound && this.sound.setVolume(volume);
  }
}

const audioHelper = new AudioHelper();

export default audioHelper;
