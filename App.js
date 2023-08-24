import React from 'react';
import {StatusBar} from 'react-native';
import Router from './Components/Router/Router';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <Router />
    </SafeAreaProvider>
  );
};

export default App;
